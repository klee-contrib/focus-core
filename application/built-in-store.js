var ApplicationStore = require('../store/application');
var instanciatedApplicationStore;
/**
 * Built the store in order to the .
 * @return {ApplicationStore} - An instanciated application store.
 */
module.exports = function builtInStore(){
  if(!instanciatedApplicationStore){
    instanciatedApplicationStore = new ApplicationStore();
  }
  return instanciatedApplicationStore;
};
