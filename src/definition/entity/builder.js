import merge from 'lodash/object/merge';

import CloningMap from '../../store/cloning-map';

import checkIsString from '../../util/string/check';
import checkIsObject from '../../util/object/check';
import checkIsNotNull from '../../util/object/checkIsNotNull';

const SEPARATOR = '.';

/**
* Pointer to the domain contaier.
* @type {Object}
*/
import { get as getDomain } from '../domain/container';
import { getFieldConfiguration, getEntityConfiguration } from './container';
const computedEntityContainer = new CloningMap();

/*
binder
idAttribute
decoratorOptions
symbol
style
decorator
isValidationOff
label
required
domain
*/

/**
 * Build the field informations.
 * @param  {string} fieldPath - The field path.
 * @return {object} - The immutable field description.
 */
function _buildFieldInformation(fieldPath) {
    const fieldConf = getFieldConfiguration(fieldPath);
    //Maybe add a domain check existance
    let { domain } = fieldConf;
    return merge({}, getDomain(domain), fieldConf);
}


/**
 * Build all entity information from entity name.
 * @param  {string} entityName - The entity name.
 */
function _buildEntityInformation(entityName) {
    const entityDomainInfos = getEntityConfiguration(entityName);
    checkIsNotNull('entityDomainInfos', entityDomainInfos);
    let container = {};
    //Populate the domain values i
    for (let key in entityDomainInfos) {
        container[key] = _buildFieldInformation(`${entityName}${SEPARATOR}${key}`);
    }
    //Update the computed information map.
    computedEntityContainer.set(entityName, container);
}


/**
* Get the entity information from the entity name and given the extended informations.
* @param {string} entityName - The name of the entity.
* @param {object} complementaryInformation - Additional information on the entity.
* @return {object} - The entity informations from the entity  name.
*/
function getEntityInformations(entityName, complementaryInformation) {
    checkIsString('entityName', entityName);
    checkIsObject('complementaryInformation', complementaryInformation);
    if (!computedEntityContainer.has(entityName)) {
        _buildEntityInformation(entityName);
    }
    return merge({}, computedEntityContainer.get(entityName), complementaryInformation);
}

/**
* Get the field informations.
* @param {string} fieldName - name or path of the field.
* @param {object} complementaryInformation - Additional informations to extend the domain informations.
* @return {object} - The builded field informations.
*/
function getFieldInformations(fieldName, complementaryInformation) {
    checkIsString('fieldName', fieldName);
    checkIsObject('complementaryInformation', complementaryInformation);
    const fieldPath = fieldName.split(SEPARATOR);
    if (computedEntityContainer.hasIn(fieldPath)) {
        return computedEntityContainer.getIn(fieldPath);
    }
    return merge({}, _buildFieldInformation(fieldPath), complementaryInformation);
}

export {
    getEntityInformations,
    getFieldInformations
};

export default {
    getEntityInformations,
    getFieldInformations
};

