const app = require('express')()
const bodyParser = require('body-parser')
const routes = require('./routes')
app.locals.my_helper = require('./helpers');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/',routes)
app.set('view engine','ejs')


app.listen(3000, ()=>{
  console.log('App listening on port 3000');
})
