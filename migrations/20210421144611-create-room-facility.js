'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomFacilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FacilityId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Facilities"
          },
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      AdId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Ads"
          },
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
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
    return queryInterface.dropTable('RoomFacilities');
  }
};