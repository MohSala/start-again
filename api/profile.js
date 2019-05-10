const express = require('express')
const mongoose = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const router = express.Router()
const Profile = require('../models/Profile')

router.get('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    
    const user = req.user.id;
    Profile.findOne({user})
    .then(profile => {
        if(!profile) {
            return res.status(400).json({
                message: 'No profile Found'
            })
        }
        res.json(profile)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.handle)profileFields.handle = req.body.handle;
    
    Profile.findOne({user:req.user.id})
    .then(profile => {
        if(profile) {
            Profile.findByOneAndUpdate({user:req.user.id}, {$set: profileFields}, {new: true})
            .then(profile => res.json(profile))
        }
        else {
            Profile.findOne({handle: profileFields.handle})
            .then(profile => {
                if(profile) {
                    res.status(400).json({handle: 'That handle already exists'})
                }
            new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.find()
    .then(profile => {
        if(!profile) {
            res.status(400).json({
                message: 'No profiles were found'
            })
        }
        res.json(profile)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/bmi', passport.authenticate('jwt', {session: false}), (req,res) => {
    const weight = req.body.weight
    const height = req.body.height * 0.3048;
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile) {
            res.status(400).json({
                message: 'No profile for this user'
            })
        }
        const newBMI = {
            weight: req.body.weight,
            height: height,
            value: weight/(height*height),
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,

        }
        profile.bmi.unshift(newBMI)
        profile.save()
        .then(profile => 
            res.json({profile:profile})
        )
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/bmi/:bmi_id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.findOne({user:req.user.id})
    .then(profile => {
        const removeIndex = profile.bmi
        .map(person => person.id)
        .indexOf(req.params.bmi_id)

        profile.bmi.splice(removeIndex)
        profile.save()
        .then(profile => {
            res.json(profile)
        })
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router