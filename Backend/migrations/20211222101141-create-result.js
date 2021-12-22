'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ResultPoint: {
        type: Sequelize.STRING
      },
      StudentId:{
        type: Sequelize.INTEGER,
        references:{
        model:'students',
        key:'id'
        }
    },
    QuizId:{
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
    await queryInterface.dropTable('Results');
  }
};