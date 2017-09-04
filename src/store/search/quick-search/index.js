import SearchStore from '../search-store';

const LISTENED_NODES = ['query', 'scope'];

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/
class QuickSearchStore extends SearchStore {
    constructor(conf) {
        conf = conf || {};
        conf.definition = {
            query: 'query',
            scope: 'scope',
            results: 'results',
            facets: 'facets',
            totalCount: 'totalCount'
        };
        conf.identifier = conf.identifier || 'QUICK_SEARCH';
        super(conf);
    }

    emitPendingEvents() {
        if (this.pendingEvents.find(ev => LISTENED_NODES.includes(ev.name.split(':change')[0]))) {
            this.emit('quick-search-criterias:change', { status: 'update' });
        }
        this.pendingEvents.map((evtToEmit) => {
            let { name, data } = evtToEmit;
            this.emit(name, data);
        });
    }

}
export default QuickSearchStore;
