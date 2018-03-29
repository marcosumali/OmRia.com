const express = require('express');
const Models = require('../models')

const routes = express.Router();


routes.get('/', function(req,res) {
    res.render('logres/login.ejs')    
})


routes.get('/driver', function(req,res) {
    res.render('logres/logDriver.ejs', {error: req.query.err})
})

routes.post('/driver', function(req,res) {
    let data = req.body;
    let data_email = data.Email;
    let data_password = data.Password;
    // res.send(data);

    Models.Driver.findOne({where:{Email:data_email}})
    .then(driver => {
        if (driver.Email == data_email && driver.Password == data_password) {
            // res.send(driver);
            req.session.driver = {
                id: driver.id,
                FirstName: driver.FirstName,
                LastName: driver.LastName,
                Email: driver.Email,
                Phone: driver.Phone,
                Gender: driver.Gender,
                LicensePlate: driver.LicensePlate,
                Password: driver.Password
            }
            req.session.role = 'driver';
            req.session.status = true;
            // res.send(req.session)
            res.redirect('/')
            console.log('Driver berhasil login !')
        } else {
            res.redirect('/login/driver?err=Error: Email/Password Anda salah ! Silahkan coba lagi')
        }
        // res.send(driver)
    })
})


routes.get('/rider', function(req,res) {
    res.render('logres/logRider.ejs', {error: req.query.err})
})


routes.post('/rider', function(req,res) {
    let data = req.body;
    let data_email = data.Email;
    let data_password = data.Password;
    // res.send(data);

    Models.Rider.findOne({where:{Email:data_email}})
    .then(rider => {
        if (rider.Email == data_email && rider.Password == data_password) {
            // res.send(rider);
            req.session.rider = {
                id: rider.id,
                FirstName: rider.FirstName,
                LastName: rider.LastName,
                Email: rider.Email,
                Phone: rider.Phone,
                Gender: rider.Gender,
                LicensePlate: rider.LicensePlate,
                Password: rider.Password
            }
            req.session.role = 'rider';
            req.session.status = true;
            // res.send(req.session)
            res.redirect('/')
            console.log('Rider berhasil login !')
        } else {
            res.redirect('/login/rider?err=Error: Email/Password Anda salah ! Silahkan coba lagi')
        }
    })
})





module.exports = routes;