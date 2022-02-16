const db = require('../../database/models/index');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req)  
    const { username, token } = req.body

    if (!errors.isEmpty())
        return res.json({
            errors: {
                status: 400,
                errors: errors.array()
            }
        })
    
    try {
        
        const result = await db.User.findOne({
            where: { username } 
        })
        
        return result && result.token === token ?
        res.json({
            status: 200,
            msg: 'Ok'
        }) :
        res.json({
            error: {
                status: 401,
                msg: 'Usuario y/o token incorrecto'
            }
        })
        
    } catch(e) {
        return res.json({
            error: {
                status: 500,
                msg: e
            }
        })
    }
}