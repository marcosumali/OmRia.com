const express = require('express');

const routes = express.Router();

routes.get('/', function(req,res) {
    let sessionData = req.session;
    // res.send(sessionData);
    if(!sessionData.driver && !sessionData.rider) {
        res.render('index.ejs');
    } else if(sessionData.driver) {
        console.log('driver masuk')
        res.render('indexDriver.ejs');
    } else if(sessionData.rider) {
        console.log('rider masuk')


        res.render('indexRider.ejs');
    }
})

routes.use('/drivers', require('./drivers.js'))
routes.use('/trips', require('./trips.js'))
const riders = require('./riders')
const ridertrips = require('./ridertrips')
routes.use('/riders',riders)
routes.use('/ridertrips',ridertrips)
routes.use('/login', require('./login'))
routes.use('/register', require('./register'))

module.exports = routes;
