const { Router } = require('express');
const router = Router();
const { param, body, query } = require('express-validator');

const getMovies = require('../../controllers/movies.controller/getMovies.controller')
const getMovieDetail = require ('../../controllers/movies.controller/getMovieDetail.controller')
const createMovies = require('../../controllers/movies.controller/createMovies.controller')
const updateMovies = require('../../controllers/movies.controller/updateMovies.controller')
const deleteMovies = require('../../controllers/movies.controller/deleteMovies.controller')

const idMovieValidation = param('id_movie')
    .isInt().withMessage('El id debe ser un numero entero')

router.get('/:id_movie/detail', [ idMovieValidation ], getMovieDetail)

router.get('/', [
    query('title')
    .optional()
    .trim().isString().isLength({ min: 2, max: 45 }).withMessage('El titulo debe tener al menos 2 caracteres'),
    query('image_url')
    .optional()
    .trim().isURL().withMessage('Ingresar una URL valida'),
    query('launch_date')
    .optional()
    .isDate().withMessage('Ingresar una fecha valida'),
    query('id_genre')
    .optional()
    .isInt().withMessage('El id debe ser un entero'),
    query('order')
    .optional()
    .isIn(['desc', 'asc'])
], getMovies)

router.post('/', [
    body('title')
    .notEmpty().withMessage('Debe ingresar un titulo')
    .trim().isString().isLength({ min: 2, max: 45 }).withMessage('El titulo debe tener al menos 2 caracteres'),
    body('image_url')
    .trim().notEmpty().isURL().withMessage('Debe ingresar una imagen'),
    body('launch_date')
    .notEmpty().withMessage('Debe ingresar una fecha de lanzamiento')
    .isDate(),
    body('rate')
    .notEmpty().withMessage('Debe ingresar un puntaje')
    .isInt({ min: 1, max: 5 }).withMessage('El puntaje debe ser del 1 al 5'),
    body('id_genre')
    .notEmpty().withMessage('Debe ingresar el id de un genero')
    .isInt().withMessage('El id debe ser un entero')
], createMovies)

router.put('/:id_movie', [
    idMovieValidation,
    body('title')
    .optional()
    .trim().isString().isLength({ min: 2, max: 45 }).withMessage('El titulo debe tener al menos 2 caracteres'),
    body('image_url')
    .optional()
    .trim().isURL().withMessage('Ingresar una URL valida'),
    body('launch_date')
    .optional()
    .isDate().withMessage('Ingresar una fecha valida'),
    body('rate')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('El puntaje debe ser del 1 al 5'),
    body('id_genre')
    .optional()
    .isInt().withMessage('El id debe ser un entero')
], updateMovies)

router.delete('/:id_movie',[ idMovieValidation ], deleteMovies)

module.exports = router