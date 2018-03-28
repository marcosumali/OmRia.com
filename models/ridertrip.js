'use strict';
module.exports = (sequelize, DataTypes) => {
  var RiderTrip = sequelize.define('RiderTrip', {
    TripId: DataTypes.STRING,
    RiderId: DataTypes.STRING,
    Donation: DataTypes.STRING
  }, {});
  RiderTrip.associate = function(models) {
    // associations can be defined here
    RiderTrip.belongsTo(models.Rider)
  };
  return RiderTrip;
};
