var UserStore = require('../store/user');
var instanciatedUserStore;
/**
 * Built the store in order to the .
 * @return {UserStore} - An instanciated user store.
 */
module.exports = function builtInStore(){
  if(!instanciatedUserStore){
    instanciatedUserStore = new UserStore();
  }
  return instanciatedUserStore;
};
