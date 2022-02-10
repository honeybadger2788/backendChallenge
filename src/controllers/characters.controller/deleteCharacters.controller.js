const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { name } = req.body
    db.Character.destroy(
        {
            where: {
                name
            }
        })
        .then(result => {
            result ?
            res.json({ status: 200, body: 'Personaje eliminado exitosamente' }) :
            res.json({ status: 404, body: 'Personaje no encontrado' })
        })
        .catch(e => {
            res.json({
                status: 500,
                body: e
            })
        })
    }