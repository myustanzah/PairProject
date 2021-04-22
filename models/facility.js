'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facility.belongsToMany(models.Ad, {
        through : models.RoomFacility
      })
    }
  };
  Facility.init({
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Facility',
  });
  return Facility;
};