var SearchStore = require('../store/search');
var QueryStore = require('../store/query');

module.exports = {
    searchStore: new SearchStore(),
    queryStore: new QueryStore()
};