'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};