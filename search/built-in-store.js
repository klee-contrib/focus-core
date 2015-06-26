let AdvancedSearchStore = require('../store/search/advanced-search');
let QuickSearchStore = require('../store/search/quick-search');

module.exports = {
    quickSearchStore: new QuickSearchStore(),
    advancedSearchStore: new AdvancedSearchStore()
};
