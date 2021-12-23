const express = require('express')
const router = express.Router()
const Question = require('../Controlers/QuestionsController')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.get('/',verifyToken,Question.GetAll)
router.get('/:id',verifyToken,Question.Get)
router.post('/',verifyToken,Question.Add)
router.put("/:id",verifyToken,Question.Update);
router.delete("/:id",verifyToken,Question.Delete);

module.exports = router