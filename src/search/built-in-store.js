import AdvancedSearchStore from '../store/search/advanced-search';
import QuickSearchStore from '../store/search/quick-search';

module.exports = {
    quickSearchStore: new QuickSearchStore(),
    advancedSearchStore: new AdvancedSearchStore()
};
