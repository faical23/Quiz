const express = require('express')
const router = express.Router()
const User = require('../Controlers/UserController')

router.post('/signUp', User.SignUp)
router.post('/signIn', User.SignIn)

module.exports = router
