const db = require('../../database/models/index');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const { id_character } = req.params
    const { name, image_url, age, weight, story } = req.body

    if (!name &&
        !image_url &&
        !age &&
        !weight &&
        !story)
        return res.status(400).json({
            error: {
                status: res.statusCode,
                msg: 'Debe ingresar al menos un campo a actualizar'
            }
        })

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
        res.status(200).json({
            status: res.statusCode,
            msg: 'Personaje actualizado exitosamente'
        }) :
        res.status(404).json({
            error: {
                status: res.statusCode,
                msg: 'Personaje no encontrado'
            }
        })
        
    } catch (e) {

        res.status(500).json({
            error: {
                status: res.statusCode,
                msg: e
            }
        })
    }
    
}