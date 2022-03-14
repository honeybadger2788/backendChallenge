const db = require('../../database/models/index');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = async (req, res) => {
    const errors = validationResult(req) 
    
    const { username, password } = req.body
    
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
        
        if ( result && bcrypt.compareSync(password, result.dataValues.password )) {
            const accessToken = jwt.sign(username, PRIVATE_KEY,/*  { expiresIn: '1h' } */)
            console.log( 'accessToken ', accessToken )
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