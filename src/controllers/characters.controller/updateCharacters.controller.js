const db = require('../../database/models/index');

module.exports = (req,res) => {
    const { name, image_url, age, weight, story } = req.body
    db.Character.update({
        name,
        image_url,
        age,
        weight,
        story
    },
    {
        where: {
            name
        }
    })
    .then(result => {
        result[0] === 1 ?
        res.json({ status: 200, body: 'Personaje actualizado exitosamente' }) :
        res.json({ status: 404, body: 'Personaje no encontrado' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}