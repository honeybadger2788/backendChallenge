const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const registerUsers = require('../../controllers/users.controllers/registerUsers.controller')
const loginUsers = require('../../controllers/users.controllers/loginUsers.controller')

router.post('/register', [
    check('username')
        .isEmail().withMessage('El usuario debe ser un email')
],registerUsers);
router.post('/login',[
    check('username')
        .isEmail().withMessage('El usuario debe ser un email'),
    check('token')
        .notEmpty().withMessage('Debe ingresar el token de seguridad')
        .isLength(45)
], loginUsers);

module.exports = router