var ReferenceStore = require('../store/reference');
var instanciatedRefStore;
/**
 * Built the store in order to the .
 * @return {ReferenceStore} - An instanciated reference store.
 */
module.exports = function builtInStore(){
  if(!instanciatedRefStore){
    instanciatedRefStore = new ReferenceStore();
  }
  return instanciatedRefStore;
};
