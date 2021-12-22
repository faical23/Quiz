const express = require('express')
const router = express.Router()
const Formateur = require('../Controlers/FormateurControllers')
const {verifyToken}=  require('../Midlleware/AuthJwt')

router.get('/',verifyToken,Formateur.GetAll)
router.get('/:id',verifyToken,Formateur.Get)
router.post('/',verifyToken,Formateur.Add)
router.put("/:id",verifyToken,Formateur.Update);
router.delete("/:id",verifyToken,Formateur.Delete);

module.exports = router