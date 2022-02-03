const { Router } = require('express');
const router = Router();

const usersController = require('../../controllers/users.controllers/users.controller')

router.post('/auth/register', usersController.register);

module.exports = router