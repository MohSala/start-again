const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const app = express()

//db config
const db = require('./config/keys').mongoURI

//connect to mongodb
mongoose
.connect(db)
.then(() => console.log('Successfully connected to DB'))
.catch(err => console.log(err))

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.use('/api/users', users)
app.use('/api/profile', profile)

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`server running on ${port}`))