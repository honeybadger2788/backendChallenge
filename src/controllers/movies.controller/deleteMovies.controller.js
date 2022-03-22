const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req,res) => {
    const { id_movie } = req.params

    try {

        validationResult(req).throw()

        const result = await db.Movie.destroy({
            where: { id_movie }
        })

        return result ?
            res.status(200).json({
                status: res.statusCode,
                msg: 'Pelicula eliminada exitosamente'
            }) :
            res.status(404).json({
                error: {
                    status: res.statusCode,
                    msg: 'Pelicula no encontrada'
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