const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('get all lists')
})

router.post('/', (req, res) => {
    res.send('get all lists')
})

module.exports = router