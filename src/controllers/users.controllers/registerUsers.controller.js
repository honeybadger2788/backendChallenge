const db = require('../../database/models/index');

const generateApiKey = require('generate-api-key');
const { validationResult } = require ('express-validator')

module.exports = async (req, res) => {
    const errors = validationResult(req)    
    const { username } = req.body
    
    if (!errors.isEmpty())
        return res.json({
            errors: {
                status: 400,
                errors: errors.array()
            }
        })
    
    try {
        
        const result = await db.User.findOrCreate({
            where: { username },
            defaults: { 
                token: generateApiKey({ method: 'string', length: 45 })
            }
        })
        
        return result[1] ?
        res.json({
            status: 201,
            msg: 'Usuario registrado exitosamente',
            token: result[0].token
        }) :
        res.json({
            error: {
                status: 400,
                msg: 'Usuario ya registrado'
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