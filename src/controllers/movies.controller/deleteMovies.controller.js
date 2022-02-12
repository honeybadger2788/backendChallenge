const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { id_movie } = req.params
    db.Movie.destroy({
        where: { id_movie }
    })
    .then(result => {
        result ?
        res.json({ status: 200, body: 'Pelicula eliminada exitosamente' }) :
        res.json({ status: 404, body: 'Pelicula no encontrada' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}