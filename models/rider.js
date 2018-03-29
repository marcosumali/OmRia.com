'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rider = sequelize.define('Rider', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Gender: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {});
  Rider.associate = function(models) {
    // associations can be defined here
    Rider.hasMany(models.RiderTrip)
    Rider.belongsToMany(models.Trip,{through: models.RiderTrip})
  };

  Rider.prototype.getFullName = function () {
    return this.FirstName+' '+this.LastName
  }

  Rider.getMister = function(value,value2) {
    return new Promise(function(resolve,reject){

      // Rider.findAll()
      // .then(data => {

        var dataGen=value+' '+value2
        resolve(dataGen);
      // })
      // .catch(err => {
      //   reject(err);
      // })
    })
  }

  return Rider;
};
