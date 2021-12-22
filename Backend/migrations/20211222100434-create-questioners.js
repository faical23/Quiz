'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questioners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      QuestionName: {
        type: Sequelize.STRING
      },
      Point: {
        type: Sequelize.INTEGER
      },
      SubjectId:{
        type: Sequelize.INTEGER,
        references:{
        model:'Subjects',
        key:'id'
        }
    },
      name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Questioners');
  }
};