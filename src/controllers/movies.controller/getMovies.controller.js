const db = require('../../database/models/index');

module.exports = (req, res) => {
    const { order } = req.query
    
    let filters = {}
    let query = { attributes: [ 'title', 'image_url', 'launch_date' ] }
    
    const filterOptions = ['title', 'id_genre']
    const field = 'launch_date'
    const validSortingTypes = ['asc', 'desc']
    
    Object.keys(req.query).forEach(key => {
        if(filterOptions.includes(key))
            filters = { ...filters, [key]: req.query[key] }
            query = { ...query, where: filters }
    })
    
    if (order != null && validSortingTypes.includes(order.toLowerCase()))
        query = { ...query, order: [[field, order]] }
    
    db.Movie.findAll(query)
    .then(result => {
        res.json({ status: 200, body: result })
    })
    .catch(e => {
        res.json({
            status: 500,
            body: e
        })
    })
}