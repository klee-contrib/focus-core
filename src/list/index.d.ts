/**
 * ListActionBuilder spec
 */
export interface ListActionBuilderSpec {

    /**
     * ListStore identifier
     */
    identifier: string;

    /**
     * Service
     */
    service: (...args: any[]) => Promise<{dataList: any[], totalCount: number}>;

    /**
     *  Function that get the associated search store value
     */
    getListOptions: () => {};

    /**
     * Number of elements to request on each search.
     */
    nbSearchElements?: number;
}

/**
 * ListAction spec
 */
export interface ListAction {

    load: LoadAction;

    /**
     * Update the query for the identifier scope.
     * @param value The query parameters.
     */
    updateProperties(value: {}): void;
}

/**
 * LoadAction interface
 */
export interface LoadAction {
    (isScroll?: boolean): void;
}

/**
 * Build a list action.
 */
export function actionBuilder(config: ListActionBuilderSpec): ListAction

/**
 * Search action generated from the config.
 * @param config Action configuration.
 */
export function loadAction(config: {}): LoadAction