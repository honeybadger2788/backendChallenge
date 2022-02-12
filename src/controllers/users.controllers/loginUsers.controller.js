const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { username, token } = req.body

    if (!username || !token)
    return res.json({
        error: {
            status: 400,
            msg: 'Ingresar username y/o token'
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
        res.json({
            error: {
                status: 500,
                msg: e
            }
        })
    }
}