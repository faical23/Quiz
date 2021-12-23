const express = require('express')
const router = express.Router()
const Subject = require('../Controlers/SubjectControllers')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.get('/',verifyToken,Subject.GetAll)
router.get('/:id',verifyToken,Subject.Get)
router.post('/',verifyToken,Subject.Add)
router.put("/:id",verifyToken,Subject.Update);
router.delete("/:id",verifyToken,Subject.Delete);

module.exports = router