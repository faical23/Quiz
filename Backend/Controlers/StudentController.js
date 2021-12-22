const DB = require('../models');
const {CryptPassword} = require('../Midlleware/Crypto')

module.exports={
    GetAll: async (req, res) => {
        let Student = await DB.student.findAll()
        .then((Student) => {
             res.status(201).send({Student})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Get : async (req, res) => {
        console.log(req.params.id)
        let student = await DB.student.findOne({ where: {id:req.params.id} })
        .then((student) => {
             res.status(201).send({student})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Add: async (req, res) => {
        const HashPass = CryptPassword(req.body.Password)
        const NewUser = await DB.users.create({ Email: req.body.Email, Password: HashPass, Role: 2 })  
        .then( async (user) =>{
            const Newstudent =  await DB.student.create({ Fullname: req.body.Fullname, UserId:user.id})
            .then((student) =>{
                res.status(201).send({"Message":'student created seccessfly'})
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
            let student = await DB.student.update({ Fullname: req.body.Fullname }, {
                where: {
                    UserId: req.params.id
                }
            }).then((student) => {
                res.status(201).send({Message:" student Update successfly"})
           }).catch((err) =>{
               res.status(400).send({Message : "Bad request"})
           })
       }).catch((err) =>{
           res.status(400).send({Message : "Bad request"})
       })
    },
    Delete: async (req, res) => {
           let student = await DB.student.destroy({ where: {UserId:req.params.id} })
           .then((student) => {
                res.status(204).send({Message:"delete succefly"})
           }).catch((err) =>{
               res.status(400).send({Message : err})
           })
    }
}