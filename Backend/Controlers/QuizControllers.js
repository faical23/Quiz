const DB = require('../models');
const {StatusCodes} = require('http-status-codes')
const db = require('../config/config')


module.exports={
    GetAll: (req, res) => {
        DB.Quiz.findAll()
        .then((Quiz) => {
            if(!Quiz){
                res.status(StatusCodes.NOT_FOUND)
            }
             res.status(StatusCodes.OK).send({Quiz})
        }).catch((err) =>{
            res.status(StatusCodes.BAD_REQUEST).send({Message : err})
        })

    },
    Get : async(req, res) => {
        db.sequelize.query(`SELECT * FROM
                            quizzes INNER JOIN quizquestions 
                            INNER JOIN questioners 
                            ON quizzes.id = quizquestions.QuizIdId 
                            AND quizquestions.QuestionId = questioners.id  
                            AND quizzes.id = 1 `, {
            type: db.sequelize.QueryTypes.CREATE
        }).then( (Quiz) => {
            res.status(StatusCodes.OK).send({Quiz})
        }).catch( err => {
            res.status(500).send('Err executing command ' + err).end()
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

}