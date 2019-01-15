const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const parser = require('body-parser')
const app = express()
const passport = require ('passport')

app.use(parser.urlencoded({extended: false}))
app.use(parser.json())

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

//Passport middleware
app.use(passport.initialize())

//Passport config
require('./config/passport')(passport)

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`server running on ${port}`))