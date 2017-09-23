import CoreStore from '../CoreStore';
/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/
class SearchStore extends CoreStore {

    /**
     * Get all the values of the store.
     *
     * @returns {object} the values
     * @memberof SearchStore
     */
    getValue() {
        return this.data.toJS();
    }
}

export default SearchStore;
