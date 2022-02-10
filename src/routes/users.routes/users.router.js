const { Router } = require('express');
const router = Router();

const registerUsers = require('../../controllers/users.controllers/registerUsers.controller')
const loginUsers = require('../../controllers/users.controllers/loginUsers.controller')

router.post('/register', registerUsers);
router.post('/login', loginUsers);

module.exports = router