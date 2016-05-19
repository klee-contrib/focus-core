/**
 * Get all entityDefinition in a JS Structure.
 * @param nodePath                      The node path.
 * @param extendedEntityConfiguration   The {} to extend the config.
 */
export function getEntityConfiguration(nodePath: string, extendedEntityConfiguration: {}): {}

/**
 * Get a field configuration given a path.
 * @param fieldPath         The field path in the map.
 * @param customFieldConf   The {} to extend the config.
 */
export function getFieldConfiguration(fieldPath: string, customFieldConf: {}): {}

/**
 * Set new entities in the map or extend existing one.
 * @param newEntities New entities description.
 */
export function setEntityConfiguration(newEntities: {}): void