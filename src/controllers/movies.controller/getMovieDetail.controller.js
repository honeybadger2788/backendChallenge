const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { id_movie } = req.params

    const result = await db.Movie.findByPk(id_movie, {
        include: db.Character
    })
    
    result !== null ?
        res.json({ status: 200, body: result }) : 
        res.json({ status: 404, body: 'Pelicula/s no encontrada/s' })
}