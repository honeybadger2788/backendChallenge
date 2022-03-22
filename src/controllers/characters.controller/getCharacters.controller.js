const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

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
        validationResult(req).throw()

        const result = await db.Character.findAll(query)

        return result.length !== 0 ?
            res.status(200).json({
                status: res.statusCode,
                data: result
            }) : 
            res.status(404).json({
                error: {
                    status: res.statusCode,
                    msg: 'Personaje/s no encontrado/s'
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
