const express = require('express')

const app = express()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/auth'))
app.listen(4000)

app.get('/', (req, res) => {
    console.log('request')
    res.send({ pippo: 'ciao' })
})

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`ciao ${name}` )
})

