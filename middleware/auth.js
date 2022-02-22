const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

module.exports = function(req, res, next) {
    // cattura il token dall'headeer
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: "Non c'è il token accesso negato" })
    } 

    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded.user
        next()
    } catch (err){
        res.status(401).json({ msg: 'Token non valido' })
    }
}