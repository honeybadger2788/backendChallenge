const db = require('../../database/models/index');

const generateApiKey = require('generate-api-key');

module.exports = async (req, res) => {
    
    const { username } = req.body
    
    if (!username)
    return res.json({
        status: 400,
        msg: 'Ingresar username'
    })
    
    try {

        const result = await db.User.findOrCreate({
            where: {
                username
            },
            defaults: {
                token: generateApiKey({ method: 'string', length: 45 }),
            }
        })
        
        return result[1] ?
        res.json({
            status: 201,
            msg: 'Usuario registrado exitosamente',
            token: result[0].token
        }) :
        res.json({
            status: 400,
            body: 'Usuario ya registrado'
        })
        
    } catch (e) {
        
        return res.json({
            status: 500,
            error: e
        })
        
    }
}