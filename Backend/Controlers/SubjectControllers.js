const DB = require('../models');

module.exports={
    GetAll: async (req, res) => {
        let subject = await DB.Subject.findAll()
        .then((subject) => {
             res.status(201).send({subject})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Get : async (req, res) => {
        let subjects = await DB.Subject.findOne({ where: {id:req.params.id} })
        .then((subjects) => {
             res.status(201).send({subjects})
        }).catch((err) =>{
            res.status(404).send({Message : "Bad request"})
        })

    },
    Add: async (req, res) => {
        const NewSubject = await DB.Subject.create({ name: req.body.Name })  
        .then( async (subject) =>{
                res.status(201).send({Message:'subject created seccessfly'})
        })
        .catch((err) => {
            res.status(400).send({error:err});
        });
    },
    Update: async (req, res) => {
        let Subject = await DB.Subject.update({ name: req.body.Name  }, {
            where: {
                id: req.params.id
            }
        }).then(async () => {
                res.status(201).send({Message:" Subject Update successfly"})
       }).catch((err) =>{
           res.status(400).send({Message : "Bad request"})
       })
    },
    Delete: async (req, res) => {
           let subject = await DB.Subject.destroy({ where: {id:req.params.id} })
           .then((subjects) => {
                res.status(204).send({Message:"subject delete succefly"})
           }).catch((err) =>{
               res.status(400).send({Message : err})
           })
    }
}