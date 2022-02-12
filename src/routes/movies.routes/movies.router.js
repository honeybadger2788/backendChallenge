const { Router } = require('express');
const router = Router();

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const getMovieDetail = require ('../../controllers/movies.controller/getMovieDetail.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')
const updateMovies = require('../../controllers/movies.controller/updateMovies.controller')
const deleteMovies = require('../../controllers/movies.controller/deleteMovies.controller')

router.get('/:id_movie/detail', getMovieDetail)
router.get('/', getMovies)
router.post('/', createMovies)
router.put('/', updateMovies)
router.delete('/', deleteMovies)

module.exports = router