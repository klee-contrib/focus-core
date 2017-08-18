import AdvancedSearchStore from '../store/search/advanced-search';
import QuickSearchStore from '../store/search/quick-search';

const quickSearchStore = new QuickSearchStore();
const advancedSearchStore = new AdvancedSearchStore();

export {
    advancedSearchStore,
    quickSearchStore
};

export default {
    advancedSearchStore,
    quickSearchStore
};