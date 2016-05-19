/**
 * Get a configuration copy.
 */
export function get(): {}

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
