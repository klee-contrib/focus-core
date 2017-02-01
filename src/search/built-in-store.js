import AdvancedSearchStore from '../store/search/advanced-search'
import QuickSearchStore from '../store/search/quick-search'

const searchStores = {
    quickSearchStore: new QuickSearchStore(),
    advancedSearchStore: new AdvancedSearchStore()
};

const {
    quickSearchStore,
    advancedSearchStore
} = searchStores;

export {
    quickSearchStore,
    advancedSearchStore
}
export default searchStores;