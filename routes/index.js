module.exports = (function(){
  const routes = require('express').Router()
  const riders = require('./riders')
  const ridertrips = require('./ridertrips')

  routes.use('/riders',riders)
  routes.use('/ridertrips',ridertrips)

  routes.get('/',function(req,res) {
    res.render('index',{})
  })
  return routes
})();
