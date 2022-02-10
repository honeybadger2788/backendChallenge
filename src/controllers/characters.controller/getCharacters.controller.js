const db = require('../../database/models/index');

module.exports = (req, res) => {
    db.Character.findAll({
        where: {
            deleted_at: null
        }
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
