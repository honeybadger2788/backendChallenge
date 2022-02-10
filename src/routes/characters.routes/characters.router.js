const { Router } = require('express');
const router = Router();

const getCharacters = require('../../controllers/characters.controller/getCharacters.controller')
const createCharacters = require('../../controllers/characters.controller/createCharacters.controller')
const updateCharacters = require('../../controllers/characters.controller/updateCharacters.controller')

router.get('/', getCharacters)
router.post('/', createCharacters)
router.put('/', updateCharacters)

module.exports = router