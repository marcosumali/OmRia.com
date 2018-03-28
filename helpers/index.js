function formatuang (number){
  var getFix=number.toLocaleString()

  return 'Rp. '+getFix;
}

module.exports = {
  formatuang:formatuang
}
