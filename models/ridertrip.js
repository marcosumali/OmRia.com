'use strict';
const {Rider,Trip,Driver} = require('../models')
module.exports = (sequelize, DataTypes) => {
  var RiderTrip = sequelize.define('RiderTrip', {
    TripId: DataTypes.INTEGER,
    RiderId: {
      type :DataTypes.STRING,
      validate :{


        // isSyariah(RiderId,next)
        // {
        //   RiderTrip.findAll({
        //     where : {
        //       TripId : this.TripId,
        //     }
        //   }).then(row4=>{
        //     Rider.findAll({
        //       where : {
        //         id : this.RiderId
        //       }
        //     }).then(row3=>{
        //         Trip.findAll({
        //
        //           where : {
        //             id : this.TripId
        //           }
        //         }).then(row2=>{
        //           Driver.findById(row2.DriverId).then(row=>{
        //             if(row.Gender==='Male' && row3.length===1 && row3.Gender==='Female'){
        //               next()
        //             }
        //             else  if(row.Gender==='Female' && row3.length===0 && row3.Gender==='Male'){
        //                 next()
        //             }
        //             else{
        //               next('Not allowed man and woman not muhrim together in one place')
        //             }
        //           }).catch(err=>{
        //             console.log(err);
        //           })
        //         })
        //       })
        //   })
        //
        // }
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
