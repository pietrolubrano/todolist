const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}))

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then( res => console.log('Connected to db'))
    .catch( err => console.log(err) )

const listener = app.listen(
    process.env.APP_LISTENING_PORT || 4000,
    () => console.log(`Listening on port: ${listener.address().port}`)
)

/* jdisaodjisao */

// Init Middleware -> per accettare i dati nel body della request
app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/workspaces', require('./routes/workspaces'))
app.use('/api/workspace', require('./routes/workspace'))

app.get('/', (req, res) => {
    console.log('request')
    res.send({ pippo: 'ciao' })
})

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`ciao ${name}` )
})

