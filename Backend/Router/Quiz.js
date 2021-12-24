const express = require('express')
const router = express.Router()
const Quiz = require('../Controlers/QuizControllers')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.get('/',verifyToken,Quiz.GetAll)
router.get('/:id',verifyToken,Quiz.Get)
router.post('/',verifyToken,Quiz.Add)
router.put('/:id',verifyToken,Quiz.Update)
router.delete('/:id',verifyToken,Quiz.Delete)


module.exports = router