'use strict';
const models = require('../models/index')
module.exports = (sequelize, DataTypes) => {
  var RiderTrip = sequelize.define('RiderTrip', {
    id: {
      type :DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    RiderId: {
      type :DataTypes.STRING,
    },
    TripId: {
      type : DataTypes.INTEGER,
      validate :{
        isSyariah(TripId,next)
        {
          RiderTrip.findAll({
            where : {
              TripId : TripId,
            },

          }).then(row4=>{

            sequelize.models.Rider.findOne({
              where : {
                id : this.RiderId
              }
            }).then(row3=>{

                sequelize.models.Trip.findOne({

                  where : {
                    id : this.TripId
                  }
                }).then(row2=>{
                  // console.log(row2.DriverId);
                  sequelize.models.Driver.findById(row2.DriverId).then(row=>{

                    if(row.Gender==='Male' && row4.length<2 && row3.Gender==='Female'){
                      next('Not allowed man and woman not muhrim together in one place')

                    }
                    else  if(row.Gender==='Female' && row4.length<2 && row3.Gender==='Male'){
                      next('Not allowed man and woman not muhrim together in one place')

                    }
                    else{
                      next()
                    }
                  }).catch(err=>{
                    console.log(err);
                  })
                })
              })
          })

        }
      }
    },
    Donation: DataTypes.INTEGER,



  }, {});
  RiderTrip.associate = function(models) {
    // associations can be defined here
    RiderTrip.belongsTo(models.Rider)
    RiderTrip.belongsTo(models.Trip)
  };
  return RiderTrip;
};
