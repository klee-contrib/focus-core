/**
 * Load a list from its description
 * @param listDesc Description of the list to load
 */
export function loadList(listDesc: {url: string}): Promise<any>

/**
 * Load a reference with its list name.
 * It calls the service which must have been registered.
 * @param listName  The name of the list to load.
 * @param args      Argument to provide to the function.
 */
export function loadListByName(listName: string, args: {}): Promise<any>

/**
 * Load many lists by their names.
 * Be careful, if there is a problem for one list, the error callback is called.
 * @param names The list of lists to load
 */
export function loadMany(names: string[]): Promise<any>[]

/**
 * Get a function to trigger in autocomplete case.
 * The function will trigger a promise.
 * @param listName Name of the list.
*/
export function getAutoCompleteServiceQuery(listName: string): (query: {term: {}, callback: Function}) => Promise<any>