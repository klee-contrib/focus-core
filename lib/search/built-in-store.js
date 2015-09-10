'use strict';

var AdvancedSearchStore = require('../store/search/advanced-search');
var QuickSearchStore = require('../store/search/quick-search');

module.exports = {
    quickSearchStore: new QuickSearchStore(),
    advancedSearchStore: new AdvancedSearchStore()
};