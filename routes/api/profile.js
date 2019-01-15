const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load profile model
const Profile = require('../../models/ProfileModel')
//load user
const User = require('../../models/UserModel')
const validateProfileInput = require('../../validations/profile')
const validateExperienceInput = require('../../validations/experience')
const validateEducationInput = require('../../validations/education')

// router.get('/profile', (req,res) => res.json({msg: 'profile works'}))

// @route GET api/profile
// @desc Get user proifle
// access Priv
router.get('/',passport.authenticate('jwt', {session:false}), (req,res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
    .then(profile  => {
        if(!profile){
            errors.noprofile = 'No profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})
// @route POST api/profile
// @desc Create user proifle
// access Priv
router.post('/',passport.authenticate('jwt', {session:false}), (req,res) => {

    const {errors, isValid} = validateProfileInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors)
    }

    //get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername

    if(typeof req.body.skills !== undefined){
        profileFields.skills = req.body.skills.split(',')
    }
    //social
    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(profile) {
            //update
            Profile.findByOneAndUpdate({user:req.user.id}, {$set: profileFields}, {new: true})
            .then(profile => res.json(profile))
        }
        else{
            //create
            
            //check if handle exists
            Profile.findOne({handle: profileFields.handle})
            .then(profile => {
                if(profile) {
                    res.status(400).json({handle: 'That handle already exists'})
                }

            //save profile
            new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })
    
    
})

router.get('/all', (req,res) => {
    const errors = {}
    Profile.find()
    .populate('user', ['name','avatar'])
    .then(profiles => {
        if(!profiles) {
           return res.status(400).json({errors: 'No Profiles'})
        }
        res.json(profiles)
    })
    .catch(err => res.json({profile: 'No profile for this user'}))
})

router.get('/handle/:handle', (req,res) => {
    const errors = {}
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'No such profile'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.json({profile: 'No such profile for this iuser'}))
    
})

router.get('/users/:user_id', (req,res) => {
    const errors = {}
    Profile.findOne({user_id: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'No such profile'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.json(err))
    
})

// @route POST api/profile/expeience
// @desc add experience to profile
// access Priv
router.post('/experience', passport.authenticate('jwt',{ session: false}), (req,res) => {

    const {errors, isValid} = validateExperienceInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        //Add to experience array
        profile.experience.unshift(newExp)
        profile.save()
        .then(profile => res.json(profile))
    })
})

// @route POST api/profile/expeience
// @desc add experience to profile
// access Priv
router.post('/education', passport.authenticate('jwt',{ session: false}), (req,res) => {

    const {errors, isValid} = validateEducationInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        //Add to education array
        profile.education.unshift(newEdu)
        profile.save()
        .then(profile => res.json(profile))
    })
})

// @route POST api/profile/expeience
// @desc add experience to profile
// access Priv
router.delete('/experience/:exp_id', passport.authenticate('jwt',{ session: false}), (req,res) => {
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)

        //splice array
        profile.experience.splice(removeIndex)

        //save
        profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err))
    })
})

// @route POST api/profile/expeience
// @desc add experience to profile
// access Priv
router.delete('/education/:edu_id', passport.authenticate('jwt',{ session: false}), (req,res) => {
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)

        //splice array
        profile.education.splice(removeIndex)

        //save
        profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err))
    })
})

module.exports = router