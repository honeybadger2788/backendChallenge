const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Characters')
})

module.exports = router