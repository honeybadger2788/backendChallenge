const { Router } = require('express');
const router = Router();

const moviesController = require('../../controllers/movies.controller/movies.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')

router.get('/', moviesController.index)
router.post('/', createMovies);

module.exports = router