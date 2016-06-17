/**
 * Sets the navigation functions.
 * @param navigate The navigate function.
 * @param back The back function.
 * @param start The start function.
 */
export function setNavigationFunctions(navigate: Function, back: Function, start: Function): void

/**
 * Navigates to the previous page.
 */
export function back(): void

/**
 * Navigates to the given URL (Backbone).
 * @param path The URL to navigate to.
 * @param options Navigation options.
 */
export function navigate(path: string, options?: {trigger?: boolean, replace?: boolean}): void

/**
 * Navigates to the given URL (React-Router).
 * @param path The URL to navigate to or an object with options.
 */
export function navigate(path: string | {pathName: string, query: {}, state: {}}): void

/**
 * Starts the router.
 */
export function start(): void
