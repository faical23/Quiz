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
        db.sequelize.query(`SELECT quizzes.Quizname , quizzes.SubjectId , quizzes.FormateurId,quizzes.ScooreQuiz , questioners.QuestionName , questioners.Point FROM
                                quizzes INNER JOIN quizquestions 
                                INNER JOIN questioners 
                                ON quizzes.id = quizquestions.QuizIdId 
                                AND quizquestions.QuestionId = questioners.id  
                                AND quizzes.id = ${req.params.id} GROUP BY questioners.QuestionName `, {
                type: db.sequelize.QueryTypes.SELECT
        }).then( (Quiz) => {
            if(Quiz.length === 0){
                return res.status(StatusCodes.NOT_FOUND).send()
            }
            res.status(StatusCodes.OK).send({Quiz})
        }).catch( err => {
            res.status(500).send('Err executing command ' + err).end()
        })
    },
    Add: (req, res) => {
        DB.Quiz.create({ Quizname: req.body.Quizname, SubjectId: req.body.SubjectId, FormateurId: req.body.FormateurId,ScooreQuiz:req.body.ScooreQuiz})  
        .then( async (Quiz) =>{
            let Question = req.body.Questions
            Question.forEach(res =>{res.QuizIdId  = Quiz.id})
            DB.QuizQuestion.bulkCreate(Question).then(()=>{
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
        DB.Quiz.update({ Quizname: req.body.Quizname, SubjectId: req.body.SubjectId, FormateurId: req.body.FormateurId,ScooreQuiz:req.body.ScooreQuiz}, {
            where: {
                id: req.params.id
            }
        }).then( () => {
            res.status(201).send({Message:" quiz Update successfly"})
       }).catch((err) =>{
           res.status(400).send({Message : "Bad request"})
       })
    },
    Delete: async (req, res) => {
        DB.Quiz.destroy({ where: {id:req.params.id} })
        .then((quiz) => {
             res.status(204).send({Message:"delete succefly"})
        }).catch((err) =>{
            res.status(400).send({Message : err})
        })
 }

}