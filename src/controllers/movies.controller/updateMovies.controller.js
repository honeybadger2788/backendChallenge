const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
    const { id_movie } = req.params
    const { title, image_url, launch_date, rate, id_genre } = req.body

    if (!title &&
        !image_url &&
        !launch_date &&
        !rate &&
        !id_genre)
        return res.status(400).json({
            error: {                
                status: res.statusCode,
                msg: 'Debe ingresar al menos un campo a actualizar'
        }
    })

    try {
        validationResult(req).throw()
        
        const result = await db.Movie.update({
            title,
            image_url,
            launch_date,
            rate,
            id_genre
        },
        {
            where: { id_movie }
        })
        
        return result[0] === 1 ?
        res.status(200).json({
            status: res.statusCode,
            msg: 'Pelicula actualizada exitosamente'
        }) :
            res.status(404).json({
                error: {                
                    status: res.statusCode,
                    msg: 'Pelicula no encontrada'
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