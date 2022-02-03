const db = require('../../database/models/index');

const generateApiKey = require('generate-api-key');

module.exports = {
    register: (req, res) => {
        db.User.findOrCreate({
            where: {
                username: req.body.username
            },
            defaults: {
                password: req.body.password,
                token: generateApiKey({ method: 'string', length: 45 }),
            }
        })
        .then(result => {
            result[1] ? res.json({ status: 200, token: result[0].token}) : res.json({ status: 400, body: 'Usuario no creado'})
        })
        .catch(e => {
            res.json({
                status: 500,
                body: e
            })
        })
    }
}