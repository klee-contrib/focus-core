var RequestStore = require('../store/request');
var instanciatedRequestStore;
/**
 * Built the store in order to the .
 * @return {RequestStore} - An instanciated application store.
 */
module.exports = function builtInStore(){
  if(!instanciatedRequestStore){
    instanciatedRequestStore = new RequestStore();
  }
  return instanciatedRequestStore;
};
