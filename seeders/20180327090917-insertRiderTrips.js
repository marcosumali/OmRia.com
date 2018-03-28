'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("RiderTrips",[{
      TripId:1,
      RiderId:1,
      Donation:20000,
      createdAt:new Date(),
      updatedAt:new Date(),
    },
    {
      TripId:1,
      RiderId:2,
      Donation:30000,
      createdAt:new Date(),
      updatedAt:new Date(),
    },
    {
      TripId:1,
      RiderId:3,
      Donation:0,
      createdAt:new Date(),
      updatedAt:new Date(),
    },
    {
      TripId:2,
      RiderId:1,
      Donation:25000,
      createdAt:new Date(),
      updatedAt:new Date(),
    },
    {
      TripId:2,
      RiderId:2,
      Donation:15000,
      createdAt:new Date(),
      updatedAt:new Date(),
    }
    ],{})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
