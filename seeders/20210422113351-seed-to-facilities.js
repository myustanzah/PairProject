'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert(`Facilities`,[
    {
     type : "AC Kamar",
     createdAt : new Date,
     updatedAt : new Date
    },
    {
      type : "Kulkas Mini",
      createdAt : new Date,
      updatedAt : new Date
     },
     {
      type : "WiFi Gratis",
      createdAt : new Date,
      updatedAt : new Date
     },
     {
      type : "Free Laundry",
      createdAt : new Date,
      updatedAt : new Date
     }
  ])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(`Facilities`)
  }
};
