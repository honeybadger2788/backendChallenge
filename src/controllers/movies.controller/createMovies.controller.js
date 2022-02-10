const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { title, image_url, launch_date, rate, id_genre } = req.body
    db.Movie.findOrCreate({
        where: {
            title
        },
        defaults: {
            title,
            image_url,
            launch_date,
            rate,
            id_genre
        }
    })
    .then(result => {
        result[1] ?
        res.json({ status: 201, body: result[0] }) :
        res.json({ status: 412, body: 'Pelicula existente' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}