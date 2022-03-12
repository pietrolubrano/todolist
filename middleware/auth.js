const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // cattura il token dall'headeer
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ 
            errors: [
                { msg: "Non c'è il token accesso negato" }
            ]
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded.user
        next()
    } catch (err){
        res.status(401).json({ 
            errors: [
                { msg: "Token non valido" }
            ]
        })
    }
}