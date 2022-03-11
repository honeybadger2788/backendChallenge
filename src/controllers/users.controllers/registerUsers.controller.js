const db = require('../../database/models/index')
const generateApiKey = require('generate-api-key')
const sgMail = require('@sendgrid/mail')
const { validationResult } = require('express-validator')
const MY_EMAIL = process.env.MY_EMAIL
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
sgMail.setApiKey(SENDGRID_API_KEY)

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

        const msg = {
            to: username, 
            from: MY_EMAIL, 
            subject: 'Welcome to Disney Movies API - Here is your access token',
            text: 'Hi! Welcome to my Disney Movies API. Here is your access token: ' + result[0].token
                + ' Please, doesnt share it with anyone',
            html: '<p>Hi! Welcome to my Disney Movies API. Here is your access token: <strong>' + result[0].token
            + '</strong> Please, doesnt share it with anyone</p>',
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
                msg: 'Email sent'
            }) :
            res.json({
                error: {
                    status: 400,
                    msg: 'Something went wrong'
                }
            })
        }
        /* return result[1] ?
        sgMail.send(msg) :
        res.json({
            error: {
                status: 400,
                msg: 'Usuario ya registrado'
            }
        }) */
        
    } catch (e) {
        
        return res.json({
            error: {
                status: 500,
                msg: e
            }
        })
        
    }
}