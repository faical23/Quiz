'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllReponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AllReponse.init({
    reponse: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    QuestionId : DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'AllReponse',
  });
  return AllReponse;
};