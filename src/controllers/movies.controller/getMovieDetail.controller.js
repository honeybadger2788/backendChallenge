const db = require('../../database/models/index');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req)
    const { id_movie } = req.params

    if (!errors.isEmpty())
    return res.json({
        errors: {
            status: 400,
            errors: errors.array()
        }
    })
    
    try {
        const result = await db.Movie.findByPk(id_movie, {
            include: [ db.Genre, db.Character ]
        })
        
        return result !== null ?
        res.json({
            status: 200,
            data: result
        }) : 
        res.json({
            error: {
                status: 404,
                msg: 'Pelicula/s no encontrada/s'
            }
        })
    } catch (e) {
        return res.json({
            error: {
                status: 500,
                msg: e
            }
        })
    }
}