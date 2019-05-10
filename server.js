const express = require('express');
const app = express()
const mongoose = require('mongoose');
const parser = require('body-parser')
const db = require('./config/keys').mongoURI;
const passport = require('passport')
const users = require('./api/users')
const profile = require('./api/profile')
const morgan = require('morgan')

app.use(parser.urlencoded({extended: false}))
app.use(parser.json())
app.use(morgan('dev'))


mongoose
.connect(db)
.then(res => {
console.log('Successfully connected to DB')
})
.catch(err => {
    console.log(err)
})


app.get('/', (req,res) => {
    res.json('Hi guys')
})

app.use('/api/users', users)
app.use('/api/profile', profile)

//Passport middleware
app.use(passport.initialize())

//Passport config
require('./config/passport')(passport)

const port = 4000;

app.listen(port, ()=> (console.log('Listening on 4000')));