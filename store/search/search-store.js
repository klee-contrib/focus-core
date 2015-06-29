let CoreStore = require('../../CoreStore');
/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */
class SearchStore extends CoreStore{
  get value(){
    return this.data.toJS();
  }
}

module.exports = SearchStore;
