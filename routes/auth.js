const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const User = require('../models/User');

router.get('/', auth, (req, res) => {
    res.status(200).json({ user: req.user })
})

router.post('/',
    body('email').isEmail().withMessage('Inserisci una mail valida'),
    body('password').exists().withMessage('Inserisci la password'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body
        
        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ msg: 'Credenziali non valide' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ msg: 'Credenziali non valide' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, process.env.JWTSECRET,
            { expiresIn: 3600 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token })
            }
        )

    }
)

module.exports = router