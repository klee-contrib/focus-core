/**
 * Get a configuration copy.
 */
export function get(): {}

/**
 * Gets the cache duration.
 */
export function getCacheDuration(): number

/**
 * Get an element from the configuration using its name.
 * @param name The key identifier of the configuration
 */
export function getConfigElement(name: string): {}

/**
 * Set the reference configuration.
 * @param newConf           The new configuration to set.
 * @param isClearPrevious   Does the config should be reset.
 */
export function set(newConf: {}, isClearPrevious?: boolean): void

/**
 * Sets the cache duration (defaults to 1 min).
 */
export function setCacheDuration(newDuration: number): void
