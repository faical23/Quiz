'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Quizname: {
        type: Sequelize.STRING
      },
      QuizPointPasser: {
        type: Sequelize.INTEGER
      },
      SubjectId:{
        type: Sequelize.INTEGER,
        references:{
        model:'Subjects',
        key:'id'
        }
    },
    FormateurId:{
      type: Sequelize.INTEGER,
      references:{
      model:'formateurs',
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
    await queryInterface.dropTable('Quizzes');
  }
};