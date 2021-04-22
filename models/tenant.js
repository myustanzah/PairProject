'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tenant.belongsTo(models.Ad, {
        foreignKey : "AdId"
      })
    }
  };
  Tenant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    AdId: DataTypes.INTEGER,
    PendingBook : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tenant',
  });
  return Tenant;
};