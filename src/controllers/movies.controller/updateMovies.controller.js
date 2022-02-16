const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { id_movie } = req.params
    const { title, image_url, launch_date, rate, id_genre } = req.body

    if (!title &&
        !image_url &&
        !launch_date &&
        !rate &&
        !id_genre)
        return res.json({
            error: {
                status: 400,
                msg: 'Ingresar datos a actualizar'
            }
        })
    
    try {
        
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
        res.json({
            status: 200,
            msg: 'Pelicula actualizada exitosamente'
        }) :
            res.json({
                error: {                
                    status: 404,
                    msg: 'Pelicula no encontrada'
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