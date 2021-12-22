'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fullname: {
        type: Sequelize.STRING
      },
      UserId:{
        type: Sequelize.INTEGER,
        references:{
        model:'users',
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
    await queryInterface.dropTable('students');
  }
};