const express = require('express');

const routes = express.Router();

routes.get('/', function(req,res) {
    res.render('index.ejs');

})

routes.use('/drivers', require('./drivers.js'))
routes.use('/trips', require('./trips.js'))
const riders = require('./riders')
const ridertrips = require('./ridertrips')
routes.use('/riders',riders)
routes.use('/ridertrips',ridertrips)


module.exports = routes;
