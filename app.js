const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('App is listening on port 3000')
})