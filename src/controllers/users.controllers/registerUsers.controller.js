const db = require('../../database/models/index')
const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail')
const { validationResult } = require('express-validator')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const MY_EMAIL = process.env.MY_EMAIL

sgMail.setApiKey(SENDGRID_API_KEY)

module.exports = async (req, res) => {
    const { username, password } = req.body
    
    try {

        validationResult(req).throw()
        
        const result = await db.User.findOrCreate({
            where: { username },
            defaults: { 
                password: bcrypt.hashSync(password,12)
            }
        })

        const msg = {
            to: username, 
            from: MY_EMAIL, 
            subject: 'Welcome to Disney Movies API',
            text: 'Hi! Welcome to my Disney Movies API. Click here to access the APIs Documentation.',
            html: '<p>Hi! Welcome to my Disney Movies API.</p> <a href="https://documenter.getpostman.com/view/14968889/UVkqrZxu">Click here to access the APIs Documentation</a>',
        }
        
        if (!result[1])
            return res.json({
                error: {
                    status: 400,
                    msg: 'Usuario ya registrado'
                }
            })
        else {
            const success = await sgMail.send(msg)
            return success ? res.json({
                status: 200,
                msg: 'Email enviado'
            }) :
            res.json({
                error: {
                    status: 400,
                    msg: 'Algo anduvo mal'
                }
            })
        }
        
    } catch (e) {
        
        return res.json({
            error: {
                status: 500,
                msg: e
            }
        })
        
    }
}