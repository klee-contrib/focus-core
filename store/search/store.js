//Dependencies.
var CoreStore = require('../CoreStore');
var assign = require('object-assign');

/**
 * Default configuration of the search.
 * @type {Object}
 */
/*var defaultSearchConfig = {
  facet:"facet",
  list:"list",
  pageInfos: "pageInfos"
};*/

class SearchStore extends CoreStore {
  constructor(conf){
    var config = assign({}, {definitionPath: "search"}, conf);
    super(config);
  }
}

module.exports = SearchStore;
