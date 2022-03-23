const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({
            error: {
                status: res.statusCode,
                msg: 'Unauthorized access'
            }
        })
    jwt.verify(token, JWT_PRIVATE_KEY, err => {
        err ? 
         res.status(403).json({
            error: {
                status: res.statusCode,
                msg: 'Token has expired'
            }
         }) :
            next()
    })
}