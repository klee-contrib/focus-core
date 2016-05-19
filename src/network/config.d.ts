/**
 * Overrides the config
 * @param conf New config
 */
export function configure(conf: {}): void

/**
 * Returns the config
 */
export function get(): {CORS: boolean, xhrErrors: {}}