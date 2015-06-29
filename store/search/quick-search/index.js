let SearchStore = require('../search-store');
/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */
class QuickSearchStore extends SearchStore{
  constructor(conf){
    conf = conf || {};
    conf.definition = {
      query: 'query',
      scope: 'scope',
      results: 'results',
      totalCount: 'totalCount'
    };
    conf.identifier = 'QUICK_SEARCH';
    super(conf);
  }
}
module.exports = QuickSearchStore;
