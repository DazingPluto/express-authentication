'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trailors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trailors.init({
    anime: DataTypes.STRING,
    trailor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trailors',
  });
  return Trailors;
};