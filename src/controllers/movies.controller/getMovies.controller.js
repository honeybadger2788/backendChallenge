const db = require('../../database/models/index');

module.exports = (req, res) => { 
    db.Movie.findAll({
        attributes: [ 'title', 'image_url', 'launch_date' ],
        where: req.query
    })
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