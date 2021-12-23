'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('allreponses', 'QuestionId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references:{
        model:'Questioners',
        key:'id'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('allreponses');
  }
};
