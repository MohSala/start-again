const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const gravatar = require('gravatar')
const bcyrpt = require('bcryptjs')
const key = require('../../config/keys').secretkey
const passport = require('passport')

//Load input validation 
const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login')


// @route GET api/users/test
// @desc Test user route
// access PUBLIC
router.get('/test', (req,res) => res.json({msg: 'User works'}))

// @route GET api/users/register
// @desc register user
// access PUBLIC
router.post('/register', (req,res) => {
const {errors, isValid} = validateRegisterInput(req.body)
if(!isValid) {
    return res.status(400).json(errors)
}

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            errors.email = 'Email Already exists'
            return res.status(400).json(errors)
        }
        else{
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            })
            bcyrpt.genSalt(10, (err, salt) => {
                bcyrpt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

// @route GET api/users/login
// @desc login route
// access PUBLIC
router.post('/login', (req,res) => {

    const {errors, isValid} = validateLoginInput(req.body)
if(!isValid) {
    return res.status(400).json(errors)
}

    const email = req.body.email
    const password = req.body.password
    // find user by email
    User.findOne({email}).then(user => {
        if(!user) {
            errors.email = 'User not found'
            return res.status(400).json({
                
            })
        }

        bcyrpt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
        //User Matched
                const payload = {id:user._id,name:user.name,avatar:user.avatar}
        //Sign token
        jwt.sign(payload,key,{expiresIn: 3600}, (err,token) => {
            
            
                res.json({
                    status: 'Success',
                    token: 'Bearer ' + token
                })
            
        })
            }
            else{
                errors.password = 'Incorrect Password'
               return res.status(400).json(errors)
            }
        })
    })
})

// @route GET api/users/current
// @desc return user
// access PRIVATE
router.get('/current', passport.authenticate('jwt',{session:false}), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router