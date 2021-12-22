const express = require('express')
const router = express.Router()
const User = require('../Controlers/UserController')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.post('/signUp', User.SignUp)
router.post('/signIn', User.SignIn)
router.delete("/SignOut",verifyToken,User.SignOut);

module.exports = router
