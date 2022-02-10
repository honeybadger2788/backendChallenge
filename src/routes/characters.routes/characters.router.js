const { Router } = require('express');
const router = Router();

const getCharacters = require('../../controllers/characters.controller/getCharacters.controller')

router.get('/', getCharacters)

module.exports = router