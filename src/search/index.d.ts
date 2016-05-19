/**
 * SearchActionBuilder spec
 */
export interface SearchActionBuilderSpec {

    /**
     * SearchStore identifier
     */
    identifier: string;

    /**
     * Service
     */
    service: {
        scoped: (...args: any[]) => Promise<any>;
        unscoped: (...args: any[]) => Promise<any>;
    };

    /**
     *  Function that get the associated search store value
     */
    getSearchOptions: () => {};

    /**
     * Number of elements to request on each search.
     */
    nbSearchElements?: number;
}

/**
 * SearchAction spec
 */
export interface SearchAction {

    search: LoadSearchAction;

    /**
     * Update the query for the identifier scope.
     * @param value The query parameters.
     */
    updateProperties(value: {[x: string]: any}): void;
}

/**
 * LoadAction interface
 */
export interface LoadSearchAction {
    (isScroll?: boolean): void;
}

/**
 * Builds a search action and returns it.
 * @param config The options used to build the service.
 */
export function actionBuilder(config: SearchActionBuilderSpec): SearchAction