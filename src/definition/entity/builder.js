const Immutable = require('immutable');
let checkIsString = require('../../util/string/check');
let checkIsObject = require('../../util/object/check');
let checkIsNotNull = require('../../util/object/checkIsNotNull');
const SEPARATOR = ".";

/**
 * Pointer to the domain contaier.
 * @type {Object}
 */
let domainContainer = require('../domain/container');
let entityContainer = require('./container');
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

//Interface
//
//

function _buildEntityInformation(entityName) {
  let entityDomainInfos = entityContainer.getEntityConfiguration(entityName);
  checkIsNotNull('entityDomainInfos', entityDomainInfos);
  let container = {};
  //Populate the domain values i
  for (let key in entityDomainInfos) {
    container[key] = _buildFieldInformation(`${entityName}${SEPARATOR}${key}`);
  }
  //Update the computed information map.
  computedEntityContainer = computedEntityContainer.set(entityName, Immutable.Map(container));
}


function _buildFieldInformation(fieldPath) {
    let fieldConf = entityContainer.getFieldConfiguration(fieldPath);
    let immutableFieldConf = Immutable.Map(fieldConf);
    //Maybe add a domain check existance
    let {domain} = fieldConf;
    return domainContainer.get(domain).mergeDeep(immutableFieldConf);
}

/**
 * Get the entity information from the entity name and given the extended informations.
 * @param {string} entityName - The name of the entity.
 * @param {object} complementaryInformation - Additional .
 */
function getEntityInformations(entityName, complementaryInformation) {
  checkIsString("entityName", entityName);
  checkIsObject("complementaryInformation", complementaryInformation);
  let key = entityName.split(SEPARATOR);
  if (!computedEntityContainer.hasIn(key)) {
    _buildEntityInformation(entityName);
  }
  return computedEntityContainer.get(entityName).mergeDeep(complementaryInformation).toJS();
}

/**
 * Get the field informations.
 * @param {string} fieldName - name or path of the field.
 * @param {object} complementaryInformation - Additional informations to extend the domain informations.
 */
function getFieldInformations(fieldName, complementaryInformation) {
  checkIsString("fieldName", fieldName);
  checkIsObject("complementaryInformation", complementaryInformation);
  let fieldPath = fieldName.split(SEPARATOR);
  if (computedEntityContainer.hasIn(fieldPath)) {
    return computedEntityContainer.getIn(fieldPath).toJS();
  }
  return _buildFieldInformation(fieldPath).mergeDeep(complementaryInformation).toJS();
}


module.exports = {
  getEntityInformations: getEntityInformations,
  getFieldInformations: getFieldInformations
};
