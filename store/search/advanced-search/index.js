let CoreStore = require('../../CoreStore');
/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */
class AdvancedSearchStore extends CoreStore{
  constructor(conf){
    conf = conf || {};
    conf.definition = {
      query: 'query',
      scope: 'scope',
      facets: 'facets',
      selectedFacets: 'selectedFacets',
      groupingKey: 'groupingKey',
      sortBy: 'sortBy',
      sortAsc: 'sortAsc',
      results: 'results',
      totalCount: 'totalCount'
    };
    conf.identifier = 'ADVANCED_SEARCH';
    super(conf);
  }
}
module.exports = AdvancedSearchStore;
