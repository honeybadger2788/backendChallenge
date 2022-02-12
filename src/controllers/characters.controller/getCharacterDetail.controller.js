const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { id_character } = req.params

    const result = await db.Character.findByPk(id_character, {
        include: db.Movie
    })
    
    result !== null ?
        res.json({ status: 200, body: result }) : 
        res.json({ status: 404, body: 'Personaje/s no encontrado/s' })
}