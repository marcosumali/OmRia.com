const express = require('express');
const Models = require('../models')

const routes = express.Router();

routes.get('/', function(req,res) {
    
    let sessionData = req.session;

    if(sessionData.driver) {
        Models.Trip.findAll({include: [{model: Models.Driver}]})
        .then(trips => {
            // res.send(trips);

            let result = [];
            for(let i = 0; i < trips.length; i++) {
                if(trips[i].Driver.id == sessionData.driver.id) {
                    result.push(trips[i]);
                }
            }

            let obj = {
                title: 'List Trips OmRia.com',
                arrTrips: result,
                error: ''
            }
            res.render('trips/trip_list.ejs', obj)
        })
    } else {
        res.redirect('/login/driver');
    }
})


routes.get('/add', function(req,res) {

    let sessionData = req.session;

    if(sessionData.driver) {
        let obj = {
            title: 'New Trip OmRia.com Form',
        }
        res.render('trips/trip_add.ejs', obj)   
    } else {
        res.redirect('/login/driver');
    }
})


routes.post('/add', function(req,res) {
    let data = req.body;

    let obj = {
        DriverId: data.DriverId,
        MaxCapacity: data.MaxCapacity,
        Status: data.Status    
    }    
    // res.send(obj)

    Models.Trip.create(obj)
    .then(trip => {
        // res.send(trip);

        let obj1 = {
            TripId: trip.id,
            RiderId: 0,
            Donation: 0
        }

        Models.RiderTrip.create(obj1)
        .then(ridertrip => {
            console.log('ini ridertrip masuk',ridertrip)
            res.redirect('/trips')
        })

    })
})


routes.get('/edit/:id', function(req,res) {

    let sessionData = req.session;

    if(sessionData.driver) {
        let id = req.params.id;

        Models.Trip.findById(id)
        .then(trip => {
            let obj = {
                title: 'Edit Trips OmRia.com Form',
                trip: trip
            }
            res.render('trips/trip_edit.ejs', obj);
        })   
    } else {
        res.redirect('/login/driver');
    }
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

    let sessionData = req.session;

    if(sessionData.driver) {

        let id = req.params.id;
    
        Models.Trip.findAll({include: [{model: Models.Driver}]})
        .then(trips => {
    
            Models.Trip.findById(id)
            .then(trip => {
                // res.send(trip)
                if (trip.Status != 'End-Trip') {
                    let obj = {
                        title: 'List Trips OmRia.com',
                        arrTrips: trips,
                        error: 'Validation Error: Sorry, you cannot delete this trip since it is not yet close!'
                    }
                    res.render('trips/trip_list.ejs', obj)
                    
                } else {
                    trip.destroy({where:{id:id}})
                    .then(trip => {
                        res.redirect('/trips');
                    })
                }
            })
        })    
    } else {
        res.redirect('/login/driver');
    }

})





module.exports = routes;