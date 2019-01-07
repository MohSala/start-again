const express = require('express')
const router = express.Router()
// const userController = require('../../controllers/userController')

router.get('/profile', (req,res) => res.json({msg: 'profile works'}))

module.exports = router