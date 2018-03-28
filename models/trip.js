'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trip = sequelize.define('Trip', {
    MaxCapacity: DataTypes.INTEGER,
    Status: DataTypes.STRING,
    DriverId: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Driver, {foreignKey: 'DriverId'})
  };

  Trip.prototype.getFullName = function() {
    // console.log(this);
    let FullName = this.Driver.FirstName + " " + this.Driver.LastName;
    // console.log('====================================================',FullName)
    // console.log('====================================================',this.Driver.FirstName)
    return FullName;
  }

  return Trip;
};