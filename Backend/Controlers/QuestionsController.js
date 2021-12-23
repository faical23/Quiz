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
        .then( async (Question) =>{
            let newRes = req.body.Reponses
            newRes.forEach(res =>{res.QuestionId = Question.id})
            DB.AllReponse.bulkCreate(newRes).then(()=>{
                res.status(201).send({response:'seuccees added'});
             }).catch((err) => {
                res.status(400).send({error:err});
            });
        })
        .catch((err) => {
            res.status(400).send({error:err});
        });
    },
    Update: (req, res) => {
        DB.Questioners.update({ QuestionName : req.body.QuestionName,Point:req.body.Point,SubjectId:req.body.SubjectId }, {
            where: {
                id: req.params.id
            }
        }).then( () => {
            res.status(201).send({Message:" questions Update successfly"})
       }).catch((err) =>{
           res.status(400).send({Message : "Bad request"})
       })
    },
    Delete: async (req, res) => {
           let Questioners = await DB.Questioners.destroy({ where: {id:req.params.id} })
           .then((Questioners) => {
                res.status(204).send({Message:"delete succefly"})
           }).catch((err) =>{
               res.status(400).send({Message : err})
           })
    }
}