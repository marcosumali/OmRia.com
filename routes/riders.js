const {Rider,RiderTrip} = require('../models')
module.exports = (function(){
  const routes = require('express').Router()

  routes.get('/', function (req, res) {
    Rider.findAll()
    .then(data => {
      res.render('riders/viewrider.ejs',{data:data});
      // res.send(data)
    });
  });

  routes.get('/add',function(req,res){
    res.render('riders/formaddrider',{data_error:req.query})
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
    Rider.findById(req.params.id).then(data=>{
      res.render('riders/formupdaterider',{data_error:req.query,data:data})
    })
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
    Rider.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.redirect('/riders')
      }).catch(err=>{
        res.send(err)
      });
    })


  return routes
})()
