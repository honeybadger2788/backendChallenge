const { Router } = require('express');
const router = Router();

const charactersController = require('../../controllers/character.controller/character.controller')

router.get('/', charactersController.index)

module.exports = router