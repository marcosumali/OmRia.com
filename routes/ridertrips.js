const {RiderTrip,Rider} = require('../models')
module.exports = (function(){
  const routes = require('express').Router()

  routes.get('/', function (req, res) {
    RiderTrip.findAll({
      order: [['id','ASC']],
      include: [{
       model: Rider
     }]
    })
    .then(data => {
      res.render('ridertrips/viewridertrip.ejs',{data:data});
      // res.send(data)
    });
  });

  routes.get('/add',function(req,res){
    Rider.findAll({
      order: [['id','ASC']],
    })
    .then(data => {
      res.render('ridertrips/formaddridertrip',{data_error:req.query,data:data})
      // res.send(data)
    });
  })

  routes.post('/add',function(req,res){
    let obj={
      TripId:req.body.TripId,
      RiderId:req.body.RiderId,
      Donation:req.body.Donation,
    }
    RiderTrip.create(obj).then(data=>{
      res.redirect('/ridertrips')
    }).catch(err=>{
      res.redirect(`ridertrips/add?error=${err.message}`)
    })
  })

  routes.get('/:id/edit',function(req,res){
    RiderTrip.findById(req.params.id).then(data=>{
      Rider.findAll().then(data2=>{
          res.render('ridertrips/formupdateridertrip',{data_error:req.query,data:data,data2:data2})
      })

    })
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
    RiderTrip.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.redirect('/ridertrips')
      }).catch(err=>{
        res.send(err)
      });
    })

  return routes
})()
