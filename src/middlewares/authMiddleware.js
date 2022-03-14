const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader)
        return res.json({
            error: {
                status: 401,
                msg: 'Unauthorized access'
            }
        })
    jwt.verify(authHeader, JWT_PRIVATE_KEY, err => {
        err ? 
         res.json({
            error: {
                status: 403,
                msg: 'Token has expired'
            }
         }) :
            next()
    })
}