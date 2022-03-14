const { check } = require("express-validator")

module.exports = {
    sanitizeFields: fields => {
        check(fields.username).isEmail().normalizeEmail().withMessage('El usuario debe ser un email'),
        check(fields.password)
        .isLength({ min: 8, max: 16 }).withMessage('La contraseña debe contener entre 8 y 16 caracteres')
    }
}