const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
    const { id_character } = req.params

    try {
        validationResult(req).throw()

        const result = await db.Character.findByPk(id_character, {
            include: db.Movie
        })
        
        return result !== null ?
            res.status(200).json({
                status: res.statusCode,
                data: result
            }) : 
            res.status(404).json({
                error: {
                    status: res.statusCode,
                    msg: 'Personaje/s no encontrado/s'
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