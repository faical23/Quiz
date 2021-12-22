const DB = require('../models');
const jwt = require('jsonwebtoken')
const {CryptPassword} = require('../Midlleware/Crypto')

const CreateToken = (Id)=>{
    const token = jwt.sign(
        { userId: Id},
        "FAICALBAHSIS",
        {
          expiresIn: "2h",
        }
      );
      return token;
}

module.exports={
    SignUp: async (req, res) => {
        const HashPass = CryptPassword(req.body.Password)
        const NewUser = await DB.users.create({ Email: req.body.Email, Password: HashPass, Role: 0 })  
        .then( async (user) =>{
            const NewFormateur =  await DB.formateurs.create({ Fullname: req.body.Fullname, UserId:user.id})
            .then((Formateurs) =>{
                const token = CreateToken(Formateurs.id) 
                // user.token = token
                res.status(201).send({"Token":token})
            }).catch((err) => {
                res.status(400).send({error:err});
            });

        })
          .catch((err) => {
                res.status(400).send({error:err});
            });
    },
    SignIn : async (req, res) => {
        if(req.body.Email === '' || req.body.Password === ''){
            res.status(400).send({error:"Invalide data"});
        }
        else{
            let User = await DB.users.findOne({ where: { Email: req.body.Email, Password:req.body.Password } });
            if (User === null) {
                res.status(404).send({Message:"Not found"});
            } else {
                const Role = User.Role
                if(User.Role === 0){
                    const Formateur = await DB.formateurs.findOne({where :{UserId:User.id}})
                    .then((Formateur) => {
                        const Token = CreateToken(Formateur.id)
                         res.status(201).send({"User":Formateur,Token:Token})
                    }).catch((err) =>{
                        res.status(404).send({Message : "Bad request"})
                    })
                }
                else{
                    const Student = await DB.student.findOne({where :{UserId:User.id}})
                    .then((Student) => {
                        const Token = CreateToken(Student.id)
                         res.status(201).send({"User":Student,Token:Token})
                    }).catch((err) =>{
                        res.status(404).send({Message : "Bad request"})
                    })

                }
            }
        }
        
    }
}