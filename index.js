const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()

if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config()
}

console.log('FE URL', process.env.FRONT_END_URL)

app.use(cors({
    origin: process.env.FRONT_END_URL,
    optionsSuccessStatus: 200 // For legacy browser support
}))

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then( res => console.log('Connected to db'))
    .catch( err => console.log(err) )

// Init Middleware -> per accettare i dati nel body della request
app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/workspaces', require('./routes/workspaces'))
app.use('/api/workspace', require('./routes/workspace'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )

    const router = app._router

    app.use('/.netlify/functions/server', router);
}

const listener = app.listen(
    process.env.PORT || 4000,
    () => console.log(`Listening on port: ${listener.address().port}`)
)

module.exports = app;