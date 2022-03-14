const db = require('../../database/models/index');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

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
            res.json({
                status: 200,
                accessToken
            })
        }
        else 
        res.json({
            error: {
                status: 401,
                msg: 'Usuario y/o password incorrecto'
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