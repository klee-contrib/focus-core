var Immutable = require('immutable');
var checkIsString = require('../util/string/check');
var checkIsObject = require('../util/object/check');
var checkIsNotNull = require('../util/object/checkIsNotNull');

/**
 * Pointer to the domain contaier.
 * @type {Object}
 */
var domainContainer = require('./container');


//Interface
function getEntityInformations(entityName, complementaryInformation){
  checkIsString("entityName", entityName);
  checkIsObject("complementaryInformation",complementaryInformation);
  var entityDomainInfos = domainContainer.get(entityName);
  checkIsNotNull('entityDomainInfos', entityDomainInfos);
  return Immutable.fromJS(entityDomainInfos).mergeDeep(complementaryInformation);
}

/**
 * Get the field informations.
 * @param {string} fieldName - name or path of the field.
 * @param {object} complementaryInformation - Additional informations to extend the domain informations.
 */
function getFieldInformations(fieldName, complementaryInformation){
  checkIsString("fieldName", fieldName);
  checkIsObject("complementaryInformation", complementaryInformation);
}


module.exports = {
  getEntityInformations: getEntityInformations,
  getFieldInformations: getFieldInformations
};
