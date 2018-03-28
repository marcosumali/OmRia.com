'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rider = sequelize.define('Rider', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Gender: DataTypes.STRING
  }, {});
  Rider.associate = function(models) {
    // associations can be defined here
    Rider.hasMany(models.RiderTrip)
    Rider.belongsToMany(models.Trip,{through: models.RiderTrip})
  };

  Rider.prototype.getFullName = function () {
    return this.FirstName+' '+this.LastName
  }

  Rider.getMister = function() {
    return new Promise(function(resolve,reject){
      Rider.findAll()
      .then(data => {
        if(data.gender==='Male'){
          var dataGen='Mr. '
        }
        else if(data.gender==='Female'){
          var dataGen='Mrs. '
        }
        resolve(dataGen);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  return Rider;
};
