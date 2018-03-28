'use strict';
module.exports = (sequelize, DataTypes) => {
  var Driver = sequelize.define('Driver', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Incorrect email address'
        }
      } 
    },
    Phone: DataTypes.STRING,
    Gender: DataTypes.STRING,
    LicensePlate: DataTypes.STRING
  }, {});
  Driver.hook('beforeCreate', (driver) => {
    // console.log(driver);
    if(!driver.LastName) {
      driver.LastName = 'sumali'
    }
  })
  Driver.hook('afterUpdate', (driver) => {
    console.log('ini hooks=============',driver)
    console.log('ini hooks lastname=============',driver.LastName)
    // if(!driver.LastName) {
    //   driver.LastName = 'sumali'
    // }
  })
  Driver.associate = function(models) {
    // associations can be defined here
    Driver.hasMany(models.Trip, {foreignKey: 'DriverId'});
  };
  return Driver;
};