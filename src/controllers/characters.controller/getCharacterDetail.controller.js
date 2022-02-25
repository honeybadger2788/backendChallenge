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
            res.json({
                status: 200,
                data: result
            }) : 
            res.json({
                error: {
                    status: 404,
                    msg: 'Personaje/s no encontrado/s'
                }
            })
        
    } catch (e) {

        res.json({
            error: {
                status: 404,
                msg: e
            }
        })

    }
}