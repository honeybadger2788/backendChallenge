const db = require('../../database/models/index');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

module.exports = async (req, res) => {
    
    const { username, password } = req.body
    
    try {
        validationResult(req).throw()
        
        const result = await db.User.findOne({
            where: { username } 
        })
        
        if (result && bcrypt.compareSync(password, result.dataValues.password)) {
            const user = {
                username
            }
            const accessToken = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '1h' })
            res.status(200).json({
                status: res.statusCode,
                accessToken
            })
        }
        else 
        res.status(401).json({
            error: {
                status: res.statusCode,
                msg: 'Usuario y/o password incorrecto'
            }
        })
        
    } catch(e) {
        return res.status(500).json({
            error: {
                status: res.statusCode,
                msg: e
            }
        })
    }
}