const { Router } = require('express');
const router = Router();

const moviesController = require('../../controllers/movies.controller/movies.controller')

router.get('/', moviesController.index)

module.exports = router