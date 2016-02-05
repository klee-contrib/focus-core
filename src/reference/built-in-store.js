const ReferenceStore = require('../store/reference');

/**
* Built the store in order to the .
* @return {ReferenceStore} - An instanciated reference store.
*/
module.exports = function() {
    return new ReferenceStore();
}
