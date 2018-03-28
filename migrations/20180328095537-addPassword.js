'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return [
      queryInterface.addColumn('Drivers','Password',{type:Sequelize.STRING}),
      queryInterface.addColumn('Riders','Password',{type:Sequelize.STRING})
    ]

  },
  
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return [
      queryInterface.removeColumn('Drivers','Password'),
      queryInterface.removeColumn('Riders','Password')
    ]

  }
};
