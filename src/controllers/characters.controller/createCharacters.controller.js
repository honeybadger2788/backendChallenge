const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { name, image_url, age, weight, story } = req.body
    db.Character.findOrCreate({
        where: {
            name
        },
        defaults: {
            name,
            image_url,
            age,
            weight,
            story
        }
    })
    .then(result => {
        result[1] ?
        res.json({ status: 201, body: result[0] }) :
        res.json({ status: 412, body: 'Personaje existente' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}