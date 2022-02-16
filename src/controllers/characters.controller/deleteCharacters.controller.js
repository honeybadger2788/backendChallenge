const db = require('../../database/models/index');

module.exports = async (req,res) => {
    const { id_character } = req.params
    
    try {
        
        const result = await db.Character.destroy({
            where: { id_character }
        })
        
        return result ?
        res.json({
            status: 200,
            msg: 'Personaje eliminado exitosamente'
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