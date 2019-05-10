const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const key = require('../config/keys').keys
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/register', (req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(user) {
            res.status(400).json({
                message: 'User Already Exists'
            })
        }

        const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {
                    res.json(user)
                })
                .catch(err => {
                    res.json(console.log(err))
                })
            })
        })
    })

})

router.post('/login', (req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(!user) {
            res.status(400).json({
                message: 'User Not found'
            })
        }
        bcrypt.compare(req.body.password,user.password)
        .then(isMatch => {
            if(!isMatch) {
                res.status(400).json({
                    message: 'Password Incorrect',

                })
            }
            const payload = {id:user._id,name: user.name}

            //assign token
            jwt.sign(payload,key, {expiresIn:3600}, (err,token) => {
                if(err) throw err
                res.json({
                    message: 'Signed In Successfully',
                    token: 'Bearer ' + token
                })
            })
        })
    })
})

router.get('/all', passport.authenticate('jwt', {session:false}) ,(req,res) => {
    const email = req.body.email
    User.find()
    .then(users => {
        if(!users) {
            res.status(400).json({
                message: 'No Users Found'
            })
        }
        res.json(users)
    })
})

module.exports = router