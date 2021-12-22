const express = require('express')
const router = express.Router()
const Student = require('../Controlers/StudentController')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.get('/',verifyToken,Student.GetAll)
router.get('/:id',verifyToken,Student.Get)
router.post('/',verifyToken,Student.Add)
router.put("/:id",verifyToken,Student.Update);
router.delete("/:id",verifyToken,Student.Delete);

module.exports = router