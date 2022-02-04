const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Movies')
})

module.exports = router