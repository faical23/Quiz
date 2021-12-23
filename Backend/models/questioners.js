'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questioners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Questioners.init({
    QuestionName: DataTypes.STRING,
    Point: DataTypes.INTEGER,
    SubjectId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Questioners',
  });
  return Questioners;
};