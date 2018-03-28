const express = require('express');
const Models = require('../models')

const routes = express.Router();

routes.get('/', function(req,res) {
    Models.Driver.findAll()
    .then(drivers => {
        // res.send(drivers);

        let obj = {
            title: 'List Drivers OmRia.com',
            arrDrivers: drivers
        }
        res.render('drivers/driver_list.ejs', obj)
    })
})


routes.get('/add', function(req,res) {
    let obj = {
        title: 'New Driver OmRia.com Form',
        error: req.query.err
    }
    // console.log(obj.error)
    res.render('drivers/driver_add.ejs', obj)
})


routes.post('/add', function(req,res) {
    let data = req.body;
    // res.send(data);
    let obj = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
        Phone: data.Phone,
        Gender: data.Gender,
        LicensePlate: data.LicensePlate
    }

    Models.Driver.create(obj)
    .then(driver => {
        res.redirect('/drivers');
    })
    .catch(err => {
        // console.log(err);
        res.redirect(`/drivers/add?err=${err.message}`)
    })
})


routes.get('/edit/:id', function(req,res) {
    let id = req.params.id;

    Models.Driver.findById(id)
    .then(driver => {
        let obj = {
            title: 'Edit Driver OmRia.com Form',
            driver: driver,
            error: req.query.err
        }
        res.render('drivers/driver_edit.ejs', obj)
    })
})


routes.post('/edit/:id', function(req,res) {
    let id = req.params.id;
    let data = req.body;

    let obj = {
        id: id,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
        Phone: data.Phone,
        Gender: data.Gender,
        LicensePlate: data.LicensePlate
    }

    Models.Driver.findById(id)
    .then(driver => {
        driver.update(obj)
        .then(info => {
            res.redirect('/drivers'); 
            // console.log('test');
        })
        .catch(err => {
            res.redirect(`/drivers/edit/${id}?err=${err.message}`)
        })      
    })

    // Models.Driver.update(obj, {where: {id:id}})
    // .then(driver => {
    //     // console.log(this)
    //     res.redirect('/drivers');
    // })
    // .catch(err => {
    //     // console.log(err);
    //     res.redirect(`/drivers/edit/${id}?err=${err.message}`)
    // })
})

routes.get('/delete/:id', function(req,res) {
    let id = req.params.id

    Models.Driver.destroy({where: {id:id}})
    .then(driver => {
        res.redirect('/drivers');
    })
})







module.exports = routes;