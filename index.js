const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config()
}

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}))

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then( res => console.log('Connected to db'))
    .catch( err => console.log(err) )

const listener = app.listen(
    process.env.PORT || 4000,
    () => console.log(`Listening on port: ${listener.address().port}`)
)

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
}
