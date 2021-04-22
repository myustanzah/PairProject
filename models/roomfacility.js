'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomFacility.init({
    FacilityId: DataTypes.INTEGER,
    AdId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomFacility',
  });
  return RoomFacility;
};