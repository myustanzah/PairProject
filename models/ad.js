'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ad.hasMany(models.Tenant, {
        foreignKey : "AdId"
      })
      Ad.belongsTo(models.Landlord, {
        foreignKey:"LandlordId"
      })
      Ad.belongsToMany(models.Facility, {
        through : models.RoomFacility
      })
    }

    joinPriceWithRenttype(cb){
      let formattedMoney = cb(this.roomprice)
      return `${formattedMoney}/${this.renttype.slice(3)}`
    }

  };
  Ad.init({
    location: DataTypes.STRING,
    LandlordId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    totalroom: DataTypes.INTEGER,
    availableroom: DataTypes.INTEGER,
    roomprice: DataTypes.INTEGER,
    renttype: DataTypes.STRING,
    name : DataTypes.STRING,
    image : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ad',
    hooks : {
      beforeCreate : (instance)=>{
        instance.availableroom = instance.totalroom
      },
      beforeUpdate : (instance)=>{
        if(instance.availableroom>instance.totalroom){
          instance.availableroom = instance.totalroom
        }
      }
    }
  });
  return Ad;
};