const express = require('express');
const router = express.Router();

const user = require('../models/User');

router.post('/', (req, res) => {
    res.send('register a user')
})

module.exports = router