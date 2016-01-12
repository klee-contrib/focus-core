import SearchStore from '../search-store';

const listenedNodes = ['query', 'scope', 'selected-facets', 'grouping-key', 'sort-by', 'sort-asc'];

/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */
class AdvancedSearchStore extends SearchStore {
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

  emitPendingEvents(){
        if(this.pendingEvents.find(ev => listenedNodes.includes(ev.name.split(':change')[0]))) {
            this.emit('advanced-search-criterias:change', {status: 'update'});
        }
        this.pendingEvents.map((evtToEmit)=>{
            let {name, data} = evtToEmit;
            this.emit(name, data);
        });
    }

}
module.exports = AdvancedSearchStore;
