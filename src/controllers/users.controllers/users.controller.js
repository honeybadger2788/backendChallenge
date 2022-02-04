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
    },
    login: (req,res) => {
        db.User.findOne({
            where:{
                username: req.body.username
            } 
        })
        .then(result => {
            result && result.password === req.body.password && result.token === req.body.token ?
            res.json({ status: 200, body: 'Ok' }) :
            res.json({ status: 404, body: 'Usuario y/o contraseña incorrecta' })
        })
        .catch(e => {
            res.json({
                status: 500,
                body: e
            })
        })
    }
}