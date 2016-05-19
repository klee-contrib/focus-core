import {Domain} from './index';

/**
 * Get a domain given a name.
 * @param domainName name of the domain.
 */
export function get(domainName: string): {toJS(): Domain}

/**
 * Get all domains in a js {}.
 */
export function getAll(): {[x: string]: Domain}

/**
 * Set a domain.
 * @param domain {} structure of the domain.
 */
export function set(domain: Domain): void

/**
 * Set new domains.
 * @param newDomains New domains to add.
 */
export function setAll(newDomains: {[x: string]: Domain}): void