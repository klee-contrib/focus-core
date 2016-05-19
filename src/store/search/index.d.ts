import {CoreStore} from '../index';

/**
 * Base search store class (don't use)
 */
export class SearchStore<T> extends CoreStore<T> {
    getValue(): {}
}

/**
 * Class standing for all quick search information.
 * The state should be the complete state of the page.
 */
export class QuickSearch extends SearchStore<{query: string, results: any[]}> {
    /**
     * Adds a listener on the global change on the search store.
     * @param {{}} conf - The configuration of the request store.
     */
    constructor(conf?: {})
}

/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */
export class AdvancedSearch extends SearchStore<{query: string, scope: string}> {
    /**
     * Adds a listener on the global change on the search store.
     * @param {{}} conf - The configuration of the request store.
     */
    constructor(conf: {})
}