const db = require('../../database/models/index');

const { validationResult } = require('express-validator');

module.exports = async (req, res) => {

    const { id_movie } = req.params
    
    try {
        validationResult(req).throw()

        const result = await db.Movie.findByPk(id_movie, {
            include: [ db.Genre, db.Character ]
        })
        
        return result !== null ?
        res.status(200).json({
            status: res.statusCode,
            data: result
        }) : 
        res.status(404).json({
            error: {
                status: res.statusCode,
                msg: 'Pelicula/s no encontrada/s'
            }
        })
    } catch (e) {
        return res.status(500).json({
            error: {
                status: res.statusCode,
                msg: e
            }
        })
    }
}