const db = require('../../database/models/index');

const generateApiKey = require('generate-api-key');

module.exports = (req, res) => {
    const { username, password } = req.body
    db.User.findOrCreate({
        where: {
            username
        },
        defaults: {
            password,
            token: generateApiKey({ method: 'string', length: 45 }),
        }
    })
    .then(result => {
        result[1] ?
        res.json({ status: 201, token: result[0].token }) :
        res.json({ status: 412, body: 'Usuario ya registrado' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}