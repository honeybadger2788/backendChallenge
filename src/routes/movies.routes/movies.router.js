const { Router } = require('express');
const router = Router();

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')

router.get('/', getMovies)
router.post('/', createMovies)

module.exports = router