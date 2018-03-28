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
  };

  Rider.prototype.getFullName = function () {
    return this.FirstName+' '+this.LastName
  }

  return Rider;
};
