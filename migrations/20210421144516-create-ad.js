'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      LandlordId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Landlords"
          },
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      type: {
        type: Sequelize.STRING
      },
      totalroom: {
        type: Sequelize.INTEGER
      },
      availableroom: {
        type: Sequelize.INTEGER
      },
      roomprice: {
        type: Sequelize.INTEGER
      },
      renttype: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ads');
  }
};