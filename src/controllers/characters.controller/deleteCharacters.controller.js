const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req,res) => {
    const { id_character } = req.params
    
    try {
        validationResult(req).throw()
        
        const result = await db.Character.destroy({
            where: { id_character }
        })
        
        return result ?
        res.status(200).json({
            status: res.statusCode,
            msg: 'Personaje eliminado exitosamente'
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