const db = require('../../database/models/index');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const { id_character } = req.params
    const { name, image_url, age, weight, story } = req.body

    try {
        validationResult(req).throw()
        
        const result = await db.Character.update({
            name,
            image_url,
            age,
            weight,
            story
        },
        {
            where: { id_character }
        })
        
        return result[0] === 1 ?
        res.json({
            status: 200,
            msg: 'Personaje actualizado exitosamente'
        }) :
        res.json({
            error: {
                status: 404,
                msg: 'Personaje no encontrado'
            }
        })
        
    } catch (e) {

        res.json({
            error: {
                status: 500,
                msg: e
            }
        })
    }
    
}