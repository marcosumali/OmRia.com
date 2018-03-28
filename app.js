const express = require('express');
var bodyParser = require('body-parser')
const session = require('express-session')

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use( session({
    secret: 'omria.com',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}) );

app.locals.my_helper = require('./helpers');
app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('App is listening on port 3000');
    // console.log(session);
})

