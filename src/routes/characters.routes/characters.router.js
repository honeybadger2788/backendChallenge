const { Router } = require('express');
const router = Router();

const getCharacters = require('../../controllers/characters.controller/getCharacters.controller')
const createCharacters = require('../../controllers/characters.controller/createCharacters.controller')

router.get('/', getCharacters)
router.post('/', createCharacters)

module.exports = router