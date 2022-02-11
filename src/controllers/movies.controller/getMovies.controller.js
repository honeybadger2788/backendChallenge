const db = require('../../database/models/index');

module.exports = (req, res) => {
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
    
    db.Movie.findAll(query)
    .then(result => {
        result.length !== 0 ?
            res.json({ status: 200, body: result }) : 
            res.json({ status: 404, body: 'Pelicula/s no encontrada/s' })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}