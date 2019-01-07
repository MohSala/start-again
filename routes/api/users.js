const express = require('express')
const router = express.Router()
// const userController = require('../../controllers/userController')

router.get('/test', (req,res) => res.json({msg: 'User works'}))

module.exports = router