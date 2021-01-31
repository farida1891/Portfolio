'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timeslot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  timeslot.init({
    timeslot: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
      timestamps: true,
    modelName: 'timeslot',
  });
  return timeslot;
};
