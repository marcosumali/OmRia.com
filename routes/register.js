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
    let sessionData = req.session;
    
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
    
        function sendEmail(sessionData) {
            const nodemailer = require('nodemailer');
    
            nodemailer.createTestAccount((err, account) => {
            
                // let sessionData = req.session;
                // console.log('ini dari nodemailer session',sessionData)
            
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: 'youremailserviceid@gmail.com', // generated ethereal user
                        pass: 'katakunci' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
            
                let mailOptions = {
                    from: '"OmRia.com" <youremailserviceid@gmail.com>', // sender address
                    to: sessionData.driver.Email, // list of receivers
                    subject: 'Hello New OmRia.com', // Subject line
                    text: 'Welcome to OmRia.com - where your islamic transporation are our priorotoes ;D', // plain text body
                    // html: '<b></b>' // html body
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            });
        }
    
        sendEmail(sessionData);
    
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

    let sessionData = req.session;

    let obj={
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Email:req.body.Email,
      Phone:req.body.Phone,
      Gender:req.body.Gender,
    }
    // res.send(obj);
    Models.Rider.create(obj).then(data=>{
        
        req.session.rider = {
            id: data.id,
            FirstName: data.FirstName,
            LastName: data.LastName,
            Email: data.Email,
            Phone: data.Phone,
            Gender: data.Gender,
            LicensePlate: data.LicensePlate,
            Password: data.Password
        }
        req.session.role = 'driver';
        req.session.status = true;
    
        function sendEmail(sessionData) {
            const nodemailer = require('nodemailer');
    
            nodemailer.createTestAccount((err, account) => {
            
                // let sessionData = req.session;
                // console.log('ini dari nodemailer session',sessionData)
            
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: 'youremailserviceid@gmail.com', // generated ethereal user
                        pass: 'katakunci' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
            
                let mailOptions = {
                    from: '"OmRia.com" <youremailserviceid@gmail.com>', // sender address
                    to: sessionData.rider.Email, // list of receivers
                    subject: 'Hello New OmRia.com', // Subject line
                    text: 'Welcome to OmRia.com - where your islamic transporation are our priorotoes ;D', // plain text body
                    // html: '<b></b>' // html body
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            });
        }
    
        sendEmail(sessionData);
    
        res.redirect('/');
    
    }).catch(err=>{
      res.redirect(`riders/add?error=${err.message}`)
    })
})


module.exports = routes;