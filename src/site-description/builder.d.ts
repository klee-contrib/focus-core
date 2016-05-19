import {SiteDescription} from './index';

/**
 * Find a route with its name and returns it.
 * @param routeToTest Route to test.
 */
export function findRouteName(routeToTest: string): string

/**
 * Gets the specified route.
 * @param routeName The name of the route.
 */
export function getRoute(routeName: string): string

/**
 * Gets all the application routes from the siteDescription.
 */
export function getRoutes(): string[]

/**
 * Gets the site description.
 */
export function getSiteDescription(): SiteDescription

/**
 * Gets the site structure.
 */
export function getSiteStructure(): {}

/**
 * Processes the siteDescription if necessary.
 * @param options The options.
 */
export function processSiteDescription(options: {isForceProcess?: any}): {} | boolean

/**
 * Regenerates the application routes.
 */
export function regenerateRoutes(): void

/**
 * Gets the RegExp associated with the route.
 * @param route The route.
 */
export function routeToRegExp(route: string): RegExp