const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { title, image_url, launch_date, rate, id_genre } = req.body
    db.Movie.update({
            title,
            image_url,
            launch_date,
            rate,
            id_genre
        },
        {
            where: {
                title
            }
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