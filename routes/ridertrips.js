const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {RiderTrip,Rider,Trip,Driver} = require('../models')
module.exports = (function(){
  const routes = require('express').Router()

  routes.get('/', function (req, res) {

    let sessionData = req.session;

    if (sessionData.rider) {
      RiderTrip.findAll({
        order: [['id','ASC']],
        where : {
          RiderId: {
            [Op.not]: 0           // status NOT FALSE
          }
        },
       include: [{
        model: Rider
      }],
     })
     .then(data=>{
      //  res.send(data);
       // Trip.findAll().then(data3 => {
  
         Trip.findAll().then(data3=>{
          Driver.findAll().then(data2=>{

              let result = [];
              for(let i = 0; i < data.length; i++) {
                  if(data[i].Rider.id == sessionData.rider.id) {
                      result.push(data[i]);
                  }
              }

              // res.send(result);

              res.render('ridertrips/viewridertrip.ejs',{data:result,data2:data2,data3:data3});
              // res.send(data)
            })
        })

        // })
      })
  
    } else {
      res.redirect('/login/rider');
    }
  });

  routes.get('/add',function(req,res){

    let sessionData = req.session;

    if (sessionData.rider) {
      Rider.findAll({
        order: [['id','ASC']],
      })
      .then(data => {
        Trip.findAll({
          order: [['id','ASC']],
          where : {
            Status : 'Open-Trip'
          }
  
        }).then(
          data2=>{
            Driver.findAll().then(data3=>{
              // res.send(data2)
              res.render('ridertrips/formaddridertrip',{data_error:req.query,data:data,data2:data2,data3:data3})
            })
          }
        )
        // res.send(data)
      });  
    } else {
      res.redirect('/login/rider');
    }

  })

  routes.post('/add',function(req,res){
    let obj={
      TripId:parseInt(req.body.TripId),
      RiderId:parseInt(req.body.RiderId),
      Donation:parseInt(req.body.Donation),
    }
    RiderTrip.create(obj).then(data=>{
      res.redirect('/ridertrips')
    }).catch(err=>{
      res.redirect(`/ridertrips/add?error=${err.message}`)
    })
  })

  routes.get('/:id/edit',function(req,res){

    let sessionData = req.session;

    if (sessionData.rider) {
      RiderTrip.findById(req.params.id).then(data=>{
        Rider.findAll().then(data2=>{
            res.render('ridertrips/formupdateridertrip',{data_error:req.query,data:data,data2:data2})
        })
  
      })  
    } else {
      res.redirect('/login/rider');
    }
    
  })

  routes.post('/:id/edit',function(req,res){
    let obj = {
      TripId:req.body.TripId,
      RiderId:req.body.RiderId,
      Donation:req.body.Donation,
    }
    RiderTrip.update(obj,{
      where:{
        id : req.params.id
      }
    }).then(data=>{
      res.redirect('/ridertrips')
      // res.send(data)
    }).catch(err=>{
      res.redirect(`/ridertrips/${req.params.id}?error=${err.message}/edit`)
    })
  })

  routes.get('/:id/delete', function (req, res) {

    let sessionData = req.session;

    if (sessionData.rider) {
      RiderTrip.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.redirect('/ridertrips')
        }).catch(err=>{
          res.send(err)
        });
  
    } else {
      res.redirect('/login/rider');
    }

  })

  routes.get('/:id/viewTrips', function (req, res) {
    Trip.findAll({
      where: {
        id: req.params.id
      },
      include: [{
        model: Driver
      }]
    }).then(data => {
      res.render('ridertrips/viewTrips',{data:data})
      // res.send(data)
      }).catch(err=>{
        res.send(err)
    });
  })

  return routes
})()
