const db = require('../../database/models/index');

module.exports = async (req,res) => {
    const { id_movie } = req.params

    try {

        const result = await db.Movie.destroy({
            where: { id_movie }
        })

        return result ?
            res.json({
                status: 200,
                msg: 'Pelicula eliminada exitosamente'
            }) :
            res.json({
                error: {
                    status: 404,
                    msg: 'Pelicula no encontrada'
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