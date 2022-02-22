const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('log a user')
})

module.exports = router