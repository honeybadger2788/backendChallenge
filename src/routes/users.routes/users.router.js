const { Router } = require('express');
const router = Router();
const { check , body} = require('express-validator');

const registerUsers = require('../../controllers/users.controllers/registerUsers.controller')
const loginUsers = require('../../controllers/users.controllers/loginUsers.controller')

router.post('/register', [
    check('username')
        .isEmail().withMessage('El usuario debe ser un email')
],registerUsers);
router.post('/login', loginUsers);

module.exports = router