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
    return queryInterface.bulkInsert("Riders",[{
      FirstName:"Eki",
      LastName:"Fakhrureza",
      Email:"eki@example.com",
      Phone:"087777777",
      Gender:"Male",
      createdAt:new Date(),
      updatedAt:new Date(),
      Password:"aaaaa"
    },
    {
      FirstName:"Lesley",
      LastName:"Nurani",
      Email:"lesley@example.com",
      Phone:"081111111",
      Gender:"Female",
      createdAt:new Date(),
      updatedAt:new Date(),
      Password:"bbbbb"
    },
    {
      FirstName:"Odette",
      LastName:"Fitriani",
      Email:"odette@example.com",
      Phone:"08222222",
      Gender:"Female",
      createdAt:new Date(),
      updatedAt:new Date(),
      Password:"ccccc"
    },
    {
      FirstName:"Matt",
      LastName:"Balmond",
      Email:"balmond@example.com",
      Phone:"083333333",
      Gender:"Male",
      createdAt:new Date(),
      updatedAt:new Date(),
      Password:"ddddd"
    },
    {
      FirstName:"Alucard",
      LastName:"Sunandar",
      Email:"alu@example.com",
      Phone:"084444444",
      Gender:"Male",
      createdAt:new Date(),
      updatedAt:new Date(),
      Password:"eeeee"
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
