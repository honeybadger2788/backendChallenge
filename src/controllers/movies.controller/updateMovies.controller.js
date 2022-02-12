const db = require('../../database/models/index');

module.exports = (req, res) => {
    const { id_movie } = req.params
    const { title, image_url, launch_date, rate, id_genre } = req.body
    db.Movie.update({
        title,
        image_url,
        launch_date,
        rate,
        id_genre
    },
    {
        where: { id_movie }
    })
    .then(result => {
        result[0] === 1 ?
        res.json({ status: 200, body: 'Pelicula actualizada exitosamente' }) :
        res.json({ status: 404, body: 'Pelicula no encontrada' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}