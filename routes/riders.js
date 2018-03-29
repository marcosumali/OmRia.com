const {Rider,RiderTrip} = require('../models')
module.exports = (function(){
  const routes = require('express').Router()

  routes.get('/', function (req, res) {

    let sessionData = req.session;
    // res.send(sessionData);

    if (sessionData.rider) {
      Rider.findAll()
      .then(data => {
        res.render('riders/viewrider.ejs',{data:data});
        // res.send(data)
      });
    } else {
      res.redirect('/login/rider');
    }

  });

  routes.get('/add',function(req,res){

    let sessionData = req.session;

    if (sessionData.rider) {
      res.render('riders/formaddrider',{data_error:req.query})
    } else {
      res.redirect('/login/rider');
    }
  })

  routes.post('/add',function(req,res){
    let obj={
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Email:req.body.Email,
      Phone:req.body.Phone,
      Gender:req.body.Gender,
    }
    Rider.create(obj).then(data=>{
      res.redirect('/riders')
    }).catch(err=>{
      res.redirect(`riders/add?error=${err.message}`)
    })
  })

  routes.get('/update/:id',function(req,res){

    let sessionData = req.session;

    if (sessionData.rider) {
      Rider.findById(req.params.id).then(data=>{
        res.render('riders/formupdaterider',{data_error:req.query,data:data})
      })  
    } else {
      res.redirect('/login/rider');
    }
  })

  routes.post('/update/:id',function(req,res){
    let obj = {
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Email:req.body.Email,
      Phone:req.body.Phone,
      Gender:req.body.Gender,
    }
    Rider.update(obj,{
      where:{
        id : req.params.id
      }
    }).then(data=>{
      res.redirect('/riders')
      // res.send(data)
    }).catch(err=>{
      res.redirect(`/riders/update/${req.params.id}?error=${err.message}`)
    })
  })


  routes.get('/delete/:id', function (req, res) {

    let sessionData = req.session;

    if (sessionData.rider) {
      Rider.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.redirect('/riders')
        }).catch(err=>{
          res.send(err)
        });  
    } else {
      res.redirect('/login/rider');
    }

  })

  return routes
})()
