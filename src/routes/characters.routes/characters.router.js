const { Router } = require('express');
const router = Router();
const { param, body, query } = require('express-validator');

const getCharacters = require('../../controllers/characters.controller/getCharacters.controller')
const getCharacterDetail = require('../../controllers/characters.controller/getCharacterDetail.controller')
const createCharacters = require('../../controllers/characters.controller/createCharacters.controller')
const updateCharacters = require('../../controllers/characters.controller/updateCharacters.controller')
const deleteCharacters = require('../../controllers/characters.controller/deleteCharacters.controller')

const idCharacterValidation = param('id_character')
.isInt().withMessage('El id debe ser un numero entero')

router.get('/:id_character/detail', [idCharacterValidation], getCharacterDetail)

router.get('/', [
    query('name')
    .optional()
    .trim().isString()
    .isLength({ min: 2, max: 45 }).withMessage('El nombre del personaje debe tener al menos 2 caracteres'),
    query('age')
    .optional()
    .isInt().withMessage('La edad debe ser un entero'),
    query('weight')
    .optional()
    .isInt().withMessage('El peso debe ser un entero')
], getCharacters)

router.post('/', [
    body('name')
    .trim().isString()
    .isLength({ min: 2, max: 45 }).withMessage('El nombre del personaje debe tener al menos 2 caracteres'),
    body('image_url')
    .trim().isURL().withMessage('Ingresar una URL valida'),
    body('age')
    .isInt().withMessage('La edad debe ser un entero'),
    body('weight')
    .isInt().withMessage('El peso debe ser un entero'),
    body('story')
    .trim().isString()
    .isLength({ min: 2, max: 280 }).withMessage('La historia debe tener menos de 280 caracteres'),
    body('movies')
    .isArray().withMessage('Debe ingresar al menos una pelicula')
], createCharacters)

router.put('/:id_character', [
    idCharacterValidation,
    body('name')
    .optional()
    .trim().isString()
    .isLength({ min: 2, max: 45 }).withMessage('El nombre del personaje debe tener al menos 2 caracteres'),
    body('image_url')
    .optional()
    .trim().isURL().withMessage('Ingresar una URL valida'),
    body('age')
    .optional()
    .isInt().withMessage('La edad debe ser un entero'),
    body('weight')
    .optional()
    .isInt().withMessage('El peso debe ser un entero'),
    body('story')
    .optional()
    .trim().isString()
    .isLength({ min: 2, max: 280 }).withMessage('La historia debe tener menos de 280 caracteres')
], updateCharacters)

router.delete('/:id_character',[ idCharacterValidation ], deleteCharacters)

module.exports = router