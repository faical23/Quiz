const DB = require('../models');
const {CryptPassword} = require('../Midlleware/Crypto')

module.exports={
    GetAll: async (req, res) => {
        let Questioners = await DB.Questioners.findAll()
        .then((Questioners) => {
             res.status(201).send({Questioners})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Get :(req, res) => {
        DB.Questioners.findOne({ where: {id:req.params.id} })
        .then((Questioners) => {
            
            DB.AllReponse.findAll({ where: {QuestionId:Questioners.id} })
            .then((ResponseForThisQuestion)=>{
                res.status(201).send({question:{...Questioners.dataValues,response:ResponseForThisQuestion} })
            }).catch((err) =>{
                res.status(404).send({Message : "Bad request"})
            })

        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Add: (req, res) => {
        DB.Questioners.create({ QuestionName: req.body.QuestionName, Point: req.body.Point, SubjectId: req.body.SubjectId,})  
        .then(  (Question) =>{
            let AllRes = req.body.Reponses
            console.log(AllRes)
            // AllRes.foreach(Res =>{
            //     console.log.log("response",res)
            // })
            DB.AllReponse.bulkCreate(
                [{"reponse": "AAAA","status": true,"QuestionId": 1 },
                { "reponse": "BBBB","status": false,"QuestionId": 1  }
             ]).then( ()=>{
                res.status(201).send({response:'seuccees added'});
             }).catch((err) => {
                res.status(400).send({error:"err"});
            });



        })
        .catch((err) => {
            res.status(400).send({error:"err"});
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