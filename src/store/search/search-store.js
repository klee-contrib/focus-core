import CoreStore from '../CoreStore';
/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/
class SearchStore extends CoreStore {
    getValue() {
        return this.data.toJS();
    }
}

export default SearchStore;
