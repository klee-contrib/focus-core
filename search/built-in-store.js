let AdvancedSearchStore = require('../store/search/advanced-search');
let QuickSearchStore = require('../store/search/advanced-search');

module.exports = {
    quickSearchStore: new QuickSearchStore(),
    advancedSearchStore: new AdvancedSearchStore()
};
