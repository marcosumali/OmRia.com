const express = require('express');

const routes = express.Router();

routes.get('/', function(req,res) {
    res.send('Welcome to OmRia.com - Omprengan Syariah');
})

routes.use('/drivers', require('./drivers.js'))
routes.use('/trips', require('./trips.js'))

module.exports = routes;