const { Router } = require('express');
const router = Router();

const registerUsers = require('../../controllers/users.controllers/registerUsers.controller')
const loginUsers = require('../../controllers/users.controllers/loginUsers.controller')

router.post('/auth/register', registerUsers);
router.post('/auth/login', loginUsers);

module.exports = router