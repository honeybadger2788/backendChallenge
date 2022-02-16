const db = require('../../database/models/index');

module.exports = async (req, res) => { 
    let filters = {}
    // permite armar la query de busqueda dinamica
    let query = { attributes: ['name', 'image_url'] } // campos a mostrar
    
    // falta agregar el filtro por serie o peliculas
    const filterOptions = ['name', 'age', 'weight'] // filtros admitidos
    
    // valida que los filtros ingresados esten entre los admitidos
    Object.keys(req.query).forEach(key => {
        if(filterOptions.includes(key))
            filters = { ...filters, [key]: req.query[key] } // permite insertar varios filtros
            query = { ...query, where: filters }
    })

    try {
        const result = await db.Character.findAll(query)

        return result.length !== 0 ?
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
                status: 500,
                msg: e
            } 
        })

    }
}
