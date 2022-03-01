const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/',
    body('name').isLength({ min: 3 }).withMessage('Inserisci un nome valido'),
    body('email').isEmail().withMessage('Inserisci una mail valida'),
    body('password').isLength({ min: 5 }).withMessage('Inserisci una password valida'),

    async (req, res) => {
        const { name, email, password } = req.body

        const checkEmail = await User.findOne({ email })

        if(checkEmail){
            const error = {
                value: email,
                msg: "Questa mail è gia registrata",
                param: "email",
                location: "body"
            }
            return res.status(400).json({ errors: [error] });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        User.create({ name, email, password: hashedPassword })
            .then(user => {
                const payload = {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                }
                jwt.sign(
                    payload, process.env.JWTSECRET,
                    { expiresIn: 3600 },
                    ( err, token ) => {
                        if(err) throw err;
                        res.json({ 
                            token,
                            user: payload.user
                        })
                    }
                )
            })
            .catch(err => res.status(400).json(err))
    }
)

module.exports = router