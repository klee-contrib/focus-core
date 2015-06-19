// Dependencies

var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');

class QueryStore extends CoreStore {
    constructor(conf){
        conf = conf || {};
        conf.definition = conf.definition || getDefinition();
        super(conf);
    }
}

module.exports = QueryStore;