const express = require('express');
const Models = require('../models')

const routes = express.Router();

routes.get('/', function(req,res) {
    res.render('logres/register.ejs')
})

routes.get('/driver', function(req,res) {
    let obj = {
        title: 'New Driver OmRia.com Form',
        error: req.query.err
    }
    res.render('drivers/driver_add.ejs',obj)
})


routes.post('/driver', function(req,res) {
    let data = req.body;
    // res.send(data);
    
    let obj = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
        Phone: data.Phone,
        Gender: data.Gender,
        LicensePlate: data.LicensePlate,
        Password: data.Password    
    }

    Models.Driver.create(obj)
    .then(driver => {
        res.redirect('/drivers')
    })
    .catch(err => {
        // console.log(err);
        res.redirect(`/drivers/add?err=${err.message}`)
    })
})


routes.get('/rider', function(req,res) {
    res.render('riders/formaddrider',{data_error:req.query})
})


routes.post('/rider', function(req,res) {
    let obj={
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Email:req.body.Email,
      Phone:req.body.Phone,
      Gender:req.body.Gender,
    }
    // res.send(obj);
    Models.Rider.create(obj).then(data=>{
      res.redirect('/');
    }).catch(err=>{
      res.redirect(`riders/add?error=${err.message}`)
    })
})


module.exports = routes;