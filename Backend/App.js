const express = require('express')
const app = express()
const router = require('./Router')
app.use(express.json())



/// create table  and connexion
const Sequlize = require('sequelize');
// const DB = new Sequlize('myschool', 'root', '', {host:'localhost',dialect:'mysql'});
// DB.authenticate().then(() => {console.log('connected to DB');});
// const User = DB.define('Users', { 
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     Email: { type: Sequelize.STRING, allowNull:false },
//     Password: { type: Sequelize.STRING, allowNull:false },
//     Role: { type: Sequelize.INTEGER, allowNull:false },
//     createdAt: Sequelize.DATE,
//     updatedAt: Sequelize.DATE,
// })

const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})