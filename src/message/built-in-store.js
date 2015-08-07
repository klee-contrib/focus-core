var MessageStore = require('../store/message');
var instanciatedMessageStore;
/**
 * Built the store in order to the .
 * @return {MessageStore} - An instanciated reference store.
 */
module.exports = function builtInStore(){
  if(!instanciatedMessageStore){
    instanciatedMessageStore = new MessageStore();
  }
  return instanciatedMessageStore;
};
