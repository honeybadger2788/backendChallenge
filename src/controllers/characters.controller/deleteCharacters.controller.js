const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { id_character } = req.params
    db.Character.destroy({
            where: { id_character }
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