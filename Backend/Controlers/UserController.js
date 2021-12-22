const DB = require('../models');
const jwt = require('jsonwebtoken')
const {CryptPassword} = require('../Midlleware/Crypto')

module.exports={
    SignUp: async (req, res) => {
        const HashPass = CryptPassword(req.body.Password)
        const NewUser = await DB.users.create({ Email: req.body.Email, Password: HashPass, Role: 0 })  
        .then((user) => res.status(201).send({user}))
          .catch((err) => {
                console.log(err);
                res.status(400).send({error:err});
            });
    },
}