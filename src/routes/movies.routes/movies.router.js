const { Router } = require('express');
const router = Router();
const { check , param, body } = require('express-validator');

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const getMovieDetail = require ('../../controllers/movies.controller/getMovieDetail.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')
const updateMovies = require('../../controllers/movies.controller/updateMovies.controller')
const deleteMovies = require('../../controllers/movies.controller/deleteMovies.controller')

const idValidation = param('id_movie')
        .isInt().withMessage('El id debe ser un numero')

router.get('/:id_movie/detail',[ idValidation ], getMovieDetail)

router.get('/', getMovies)

router.post('/', createMovies)

router.put('/:id_movie', [
    idValidation,
    body('title')
        .notEmpty().withMessage('Debe ingresar un titulo')
        .isString().isLength({ min: 2, max: 45 }).trim().withMessage('El titulo debe tener al menos 2 caracteres'),
    body('image_url')
        .notEmpty().withMessage('Debe ingresar una imagen')
        .isURL().trim(),
    body('launch_date')
        .notEmpty().withMessage('Debe ingresar una fecha de lanzamiento')
        .isDate(),
    body('rate')
        .notEmpty().withMessage('Debe ingresar un puntaje')
        .isInt({ min: 1, max: 5 }).withMessage('El puntaje debe ser del 1 al 5'),
    body('id_genre')
        .notEmpty().withMessage('Debe ingresar el id de un genero')
        .isInt().withMessage('El id debe ser un entero')
], updateMovies)

router.delete('/:id_movie', [idValidation], deleteMovies)

module.exports = router