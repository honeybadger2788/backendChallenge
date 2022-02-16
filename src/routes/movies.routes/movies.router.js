const { Router } = require('express');
const router = Router();
const { check , param } = require('express-validator');

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const getMovieDetail = require ('../../controllers/movies.controller/getMovieDetail.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')
const updateMovies = require('../../controllers/movies.controller/updateMovies.controller')
const deleteMovies = require('../../controllers/movies.controller/deleteMovies.controller')

router.get('/:id_movie/detail', [
    param('id_movie')
        .isInt().withMessage('El id debe ser un numero')
], getMovieDetail)
router.get('/', getMovies)
router.post('/', createMovies)
router.put('/:id_movie', updateMovies)
router.delete('/:id_movie', deleteMovies)

module.exports = router