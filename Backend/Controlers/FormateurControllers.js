const DB = require('../models');
const {CryptPassword} = require('../Midlleware/Crypto')

module.exports={
    GetAll: async (req, res) => {
        let Formateurs = await DB.formateurs.findAll()
        .then((Formateurs) => {
             res.status(201).send({Formateurs})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Get : async (req, res) => {
        console.log(req.params.id)
        let Formateur = await DB.formateurs.findOne({ where: {id:req.params.id} })
        .then((Formateur) => {
             res.status(201).send({Formateur})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Add: async (req, res) => {
        const HashPass = CryptPassword(req.body.Password)
        const NewUser = await DB.users.create({ Email: req.body.Email, Password: HashPass, Role: 1 })  
        .then( async (user) =>{
            const NewFormateur =  await DB.formateurs.create({ Fullname: req.body.Fullname, UserId:user.id})
            .then((Formateurs) =>{
                res.status(201).send({"Message":'Formateur created seccessfly'})
            }).catch((err) => {
                res.status(400).send({error:err});
            });

        })
        .catch((err) => {
            res.status(400).send({error:err});
        });
    },
    Update: async (req, res) => {
        let users = await DB.users.update({ Email : req.body.Email }, {
            where: {
                id: req.params.id
            }
        }).then(async () => {
            let Formateur = await DB.formateurs.update({ Fullname: req.body.Fullname }, {
                where: {
                    UserId: req.params.id
                }
            }).then((Formateur) => {
                res.status(201).send({Message:"Update successfly"})
           }).catch((err) =>{
               res.status(400).send({Message : "Bad request"})
           })
       }).catch((err) =>{
           res.status(400).send({Message : "Bad request"})
       })
    },
    Delete: async (req, res) => {
           let Formateur = await DB.formateurs.destroy({ where: {UserId:req.params.id} })
           .then((Formateur) => {
                res.status(204).send({Message:"delete succefly"})
           }).catch((err) =>{
               res.status(400).send({Message : err})
           })
    }
}