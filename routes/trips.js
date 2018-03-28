const express = require('express');
const Models = require('../models')

const routes = express.Router();

routes.get('/', function(req,res) {
    Models.Trip.findAll({include: [{model: Models.Driver}]})
    .then(trips => {
        // res.send(trips);
        // console.log('===================================',Models.Trip)
        let obj = {
            title: 'List Trips OmRia.com',
            arrTrips: trips
        }
        res.render('trips/trip_list.ejs', obj)
    })
})


routes.get('/add', function(req,res) {
    let obj = {
        title: 'New Trip OmRia.com Form',
    }
    res.render('trips/trip_add.ejs', obj)
})


routes.post('/add', function(req,res) {
    let id = req.params.id;
    let data = req.body;
    let obj = {
        id: id,
        MaxCapacity: data.MaxCapacity,
        Status: data.Status,
        DriverId: data.DriverId
    }    

    Models.Trip.create(obj)
    .then(trip => {
        res.redirect('/trips')
    })
})


routes.get('/edit/:id', function(req,res) {
    let id = req.params.id;

    Models.Trip.findById(id)
    .then(trip => {
        let obj = {
            title: 'Edit Trips OmRia.com Form',
            trip: trip
        }
        res.render('trips/trip_edit.ejs', obj);
    })
})


routes.post('/edit/:id', function(req,res) {
    let id = req.params.id;
    let data = req.body;

    let obj = {
        id: id,
        MaxCapacity: data.MaxCapacity,
        Status: data.Status,
        DriverId: data.DriverId
    }

    Models.Trip.update(obj, {where: {id:id}})
    .then(trip => {
        res.redirect('/trips')
    })
})


routes.get('/delete/:id', function(req,res) {
    let id = req.params.id;

    Models.Trip.destroy({where:{id:id}})
    .then(trip => {
        res.redirect('/trips');
    })
})





module.exports = routes;