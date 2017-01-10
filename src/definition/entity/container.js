//Dependencies.
const Immutable = require('immutable');
const checkIsString = require('../../util/string/check');
const checkIsObject = require('../../util/object/check');

/**
* Separator for the configuration
* @type {String}
*/
const SEPARATOR = '.';

/**
* Container for the application entities.
* @type {object}
*/
let entitiesMap = Immutable.Map({});

/**
* Get all entityDefinition in a JS Structure.
* @param {string} - The node path (with .).
* @param {object} extendedEntityConfiguration - The object to extend the config.
* @return {object} - The entity configuration from a given path.
*/
function getEntityConfiguration(nodePath, extendedEntityConfiguration) {
    //If a node is specified get the direct sub conf.
    if(nodePath) {
        return _getNode(nodePath, extendedEntityConfiguration).toJS();
    }
    return entitiesMap.toJS();
}

/**
* Set new entities in the map or extend existing one.
* @param {object} newEntities - new entities description
*/
function setEntityConfiguration(newEntities) {
    checkIsObject('newEntities', newEntities);
    entitiesMap = entitiesMap.mergeDeep(newEntities);
}


/**
* Get a node configuration given a node path "obj.prop.subProp".
* @param {string} nodePath - The node path you want to get.
* @param {object} extendedConfiguration - The object to extend the config.
* @return {object} - The node configuration.
*/
function _getNode(nodePath, extendedConfiguration) {
    checkIsString('nodePath', nodePath);
    if(!entitiesMap.hasIn(nodePath.split(SEPARATOR))) {
        console.warn(`
            It seems the definition your are trying to use does not exists in the entity definitions of your project.
            The definition you want is ${nodePath} and the definition map is:
            `, entitiesMap.toJS()
        );
        throw new Error('Wrong definition path given, see waning for more details');
    }
    let conf = entitiesMap.getIn(nodePath.split(SEPARATOR));
    if(extendedConfiguration) {
        checkIsObject(extendedConfiguration);
        conf = conf.mergeDeep(extendedConfiguration);
    }
    return conf;
}

/**
* Get a field configuration given a path.
* @param {string} fieldPath - The field path in the map.
* @param {object} customFieldConf - The object to extend the config.
* @return {object} - The field configuration.
*/
function getFieldConfiguration(fieldPath, customFieldConf) {
    return _getNode(fieldPath, customFieldConf).toJS();
}


export {
    getEntityConfiguration,
    setEntityConfiguration,
    getFieldConfiguration
};
export default {
    getEntityConfiguration,
    setEntityConfiguration,
    getFieldConfiguration
};
