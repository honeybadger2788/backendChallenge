const { Router } = require('express');
const router = Router();

const usersController = require('../../controllers/users.controllers/users.controller')

router.get('/', usersController.index)

module.exports = router