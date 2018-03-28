'use strict';

const fs = require('fs');

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

    let raw_data = fs.readFileSync('./seeders/driver.csv','utf8').trim().split('\n')
    
    let data = []; 
    for (let i = 1; i < raw_data.length;i++) {
      data.push(raw_data[i].split(','));
    }
    
    let input_data = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {
        FirstName: data[i][1],
        LastName: data[i][2],
        Email: data[i][3],
        Phone: data[i][4],
        Gender: data[i][5],
        LicensePlate: data[i][6],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      input_data.push(obj);
    }

    return queryInterface.bulkInsert('Drivers', input_data, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Drivers', null, {});
  
  }
};
