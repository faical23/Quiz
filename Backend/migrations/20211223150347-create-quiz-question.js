'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      QuestionId:{
        type: Sequelize.INTEGER,
        references:{
        onDelete: 'CASCADE',
        model:'Questioners',
        key:'id'
        }
      },
        QuizIdId:{
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          references:{
          model:'Quizzes',
          key:'id'
          }
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizQuestions');
  }
};