const ReferenceStore = require('../store/reference');

let ref;

/**
* Built the store in order to the .
* @return {ReferenceStore} - An instanciated reference store.
*/
module.exports = function () {
    if (!ref) {
        ref = new ReferenceStore();
    }
    return ref;
};
