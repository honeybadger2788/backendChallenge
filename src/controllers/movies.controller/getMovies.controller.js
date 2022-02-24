const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
    const { order } = req.query
    
    let filters = {}
    // permite armar la query de busqueda dinamica
    let query = { attributes: [ 'title', 'image_url', 'launch_date' ] } // campos a mostrar
    
    const filterOptions = ['title', 'id_genre'] // filtros admitidos
    const field = 'launch_date' // campo de ordenamiento admitido
    const validSortingTypes = ['asc', 'desc'] // ordenamiento admitido
    
    // valida que los filtros ingresados esten entre los admitidos
    Object.keys(req.query).forEach(key => {
        if(filterOptions.includes(key))
            filters = { ...filters, [key]: req.query[key] } // permite insertar varios filtros
            query = { ...query, where: filters }
    })
    
    // inserta la regla de ordenamiento solo en caso de haberla ingresado
    if (order != null && validSortingTypes.includes(order.toLowerCase()))
        query = { ...query, order: [[field, order]] }
    
    try {
        validationResult(req).throw()

        const result = await db.Movie.findAll(query)

        return result.length !== 0 ?
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