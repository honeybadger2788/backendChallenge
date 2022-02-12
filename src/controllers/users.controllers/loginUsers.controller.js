const db = require('../../database/models/index');

module.exports = (req, res) => {
    const { username, password, token } = req.body
    db.User.findOne({
        where:{
            username
        } 
    })
    .then(result => {
        result && result.password === password && result.token === token ?
        res.json({ status: 200, body: 'Ok' }) :
        res.json({ status: 401, body: 'Usuario y/o token incorrecto' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}