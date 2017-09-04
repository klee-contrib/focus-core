import Immutable from 'immutable';
import checkIsString from '../../util/string/check';
import checkIsObject from '../../util/object/check';
import checkIsNotNull from '../../util/object/checkIsNotNull';
const SEPARATOR = '.';

/**
* Pointer to the domain contaier.
* @type {Object}
*/
import domainContainer from '../domain/container';
import entityContainer from './container';
let computedEntityContainer = Immutable.Map({});

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
 * Build all entity information from entity name.
 * @param  {string} entityName - The entity name.
 */
function _buildEntityInformation(entityName) {
    const entityDomainInfos = entityContainer.getEntityConfiguration(entityName);
    checkIsNotNull('entityDomainInfos', entityDomainInfos);
    let container = {};
    //Populate the domain values i
    for (let key in entityDomainInfos) {
        container[key] = _buildFieldInformation(`${entityName}${SEPARATOR}${key}`);
    }
    //Update the computed information map.
    computedEntityContainer = computedEntityContainer.set(entityName, Immutable.Map(container));
}

/**
 * Build the field informations.
 * @param  {string} fieldPath - The field path.
 * @return {Immutable.Map} - The immutable field description.
 */
function _buildFieldInformation(fieldPath) {
    const fieldConf = entityContainer.getFieldConfiguration(fieldPath);
    const immutableFieldConf = Immutable.Map(fieldConf);
    //Maybe add a domain check existance
    let { domain } = fieldConf;
    return domainContainer.get(domain).mergeDeep(immutableFieldConf);
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
    const key = entityName.split(SEPARATOR);
    if (!computedEntityContainer.hasIn(key)) {
        _buildEntityInformation(entityName);
    }
    return computedEntityContainer.get(entityName).mergeDeep(complementaryInformation).toJS();
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
        return computedEntityContainer.getIn(fieldPath).toJS();
    }
    return _buildFieldInformation(fieldPath).mergeDeep(complementaryInformation).toJS();
}

export {
    getEntityInformations,
    getFieldInformations
};

export default {
    getEntityInformations,
    getFieldInformations
};

