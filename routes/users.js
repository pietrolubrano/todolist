const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

router.post('/',
    body('name').isLength({ min: 3 }).withMessage('Inserisci un nome valido'),
    body('email').isEmail().withMessage('Inserisci una mail valida'),
    body('password').isLength({ min: 5 }).withMessage('Inserisci una password valida'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then(user => res.json(user))
            .catch(err => {
                if(err.keyValue['email']){
                    const error = {
                        value: email,
                        msg: "Questa mail è gia registrata",
                        param: "email",
                        location: "body"
                    }
                    
                    console.log(err.keyValue)
                    return res.status(400).json({ errors: [error] });
                }
                return res.status(400).json(err);
            })
    }
)

module.exports = router