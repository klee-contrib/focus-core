var root = require('../config').apiroot;

var urls = {
  //Deals with all the nantissement urls.
  nantissement:{
    pret: root + "/pret"
  },
	virtualMachine:               root + 'vm',
	reference: root + 'reference'
};
module.exports = urls;