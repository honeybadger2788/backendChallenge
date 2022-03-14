const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');

const registerUsers = require('../../controllers/users.controllers/registerUsers.controller')
const loginUsers = require('../../controllers/users.controllers/loginUsers.controller')

router.post('/register',[
    body('username')
        .isEmail().normalizeEmail().withMessage('El usuario debe ser un email'),
    body('password')
        .isLength({ min: 8, max: 16 }).withMessage('La contraseña debe contener entre 8 y 16 caracteres')
], registerUsers);

router.post('/login',[
    body('username')
        .isEmail().withMessage('El usuario debe ser un email'),
    body('password')
        .notEmpty().withMessage('Debe ingresar su contraseña')
], loginUsers);

module.exports = router