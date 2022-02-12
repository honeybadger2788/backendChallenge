const { Router } = require('express');
const router = Router();

const getCharacters = require('../../controllers/characters.controller/getCharacters.controller')
const getCharacterDetail = require('../../controllers/characters.controller/getCharacterDetail.controller')
const createCharacters = require('../../controllers/characters.controller/createCharacters.controller')
const updateCharacters = require('../../controllers/characters.controller/updateCharacters.controller')
const deleteCharacters = require('../../controllers/characters.controller/deleteCharacters.controller')

router.get('/:id_character/detail', getCharacterDetail)
router.get('/', getCharacters)
router.post('/', createCharacters)
router.put('/', updateCharacters)
router.delete('/', deleteCharacters)

module.exports = router