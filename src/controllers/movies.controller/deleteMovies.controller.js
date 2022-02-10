const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { title } = req.body
    db.Movie.destroy(
    {
        where: {
            title
        }
    })
    .then(result => {
        result[0] === 1?
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