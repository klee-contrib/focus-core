import {SiteDescription} from './index';

/**
 * Checks if the params is define in the params list.
 * @param paramsArray The parameter array.
 */
export function checkParams(paramsArray: any[]): boolean

/**
 * Defines a parameter.
 * @param param The parameter to define.
 */
export function defineParam(param: {name: string, value: any}): boolean

/**
 * Defines the application site description.
 * @param siteDescription The application site description.
 */
export function defineSite(siteDescription: SiteDescription): {}

/**
 * Gets the site description parameters.
 */
export function getParams(): {}

/**
 * Gets the site process.
 */
export function getSite(): {}

export function isProcessed(): boolean