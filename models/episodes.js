'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Episodes.init({
    one: DataTypes.STRING,
    two: DataTypes.STRING,
    three: DataTypes.STRING,
    four: DataTypes.STRING,
    five: DataTypes.STRING,
    six: DataTypes.STRING,
    seven: DataTypes.STRING,
    eight: DataTypes.STRING,
    nine: DataTypes.STRING,
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Episodes',
  });
  return Episodes;
};