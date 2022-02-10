const { Router } = require('express');
const router = Router();

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')
const updateMovies = require('../../controllers/movies.controller/updateMovies.controller')

router.get('/', getMovies)
router.post('/', createMovies)
router.put('/', updateMovies)

module.exports = router