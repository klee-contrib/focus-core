var Immutable = require('immutable');
var checkIsString = require('../../util/string/check');
var checkIsObject = require('../../util/object/check');
var checkIsNotNull = require('../../util/object/checkIsNotNull');
const SEPARATOR = ".";

/**
 * Pointer to the domain contaier.
 * @type {Object}
 */
var domainContainer = require('../domain/container');
var entityContainer = require('./container');
var computedEntityContainer = Immutable.Map({});

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
	var entityDomainInfos = entityContainer.getEntityConfiguration(entityName);
	checkIsNotNull('entityDomainInfos', entityDomainInfos);
	var container = {};
	//Populate the domain values i
	for (var key in entityDomainInfos) {
		container[key] = _buildFieldInformation(`${entityName}${SEPARATOR}${key}`);
	}
}

function _buildFieldInformation(fieldPath) {
	var fieldConf = computedEntityContainer.getFieldConfiguration(fieldPath);
	return Immutable.Map(fieldConf).mergeDeep(domainContainer[fieldConf.domain]);
}

function getEntityInformations(entityName, complementaryInformation) {
	checkIsString("entityName", entityName);
	checkIsObject("complementaryInformation", complementaryInformation);
	var key = entityName.split(SEPARATOR);
	if (!computedEntityContainer.hasIn(key)) {
		_buildEntityInformation(entityName);
	}
	return computedEntityContainer.mergeDeep(complementaryInformation).toJS();
}



/**
 * Get the field informations.
 * @param {string} fieldName - name or path of the field.
 * @param {object} complementaryInformation - Additional informations to extend the domain informations.
 */
function getFieldInformations(fieldName, complementaryInformation) {
	checkIsString("fieldName", fieldName);
	checkIsObject("complementaryInformation", complementaryInformation);
	var fieldPath = fieldName.split(SEPARATOR);
	if (computedEntityContainer.hasIn(fieldPath)) {
		return computedEntityContainer.getIn(fieldPath);
	}
	return _buildFieldInformation(fieldPath).mergeDeep(complementaryInformation).toJS();
}


module.exports = {
	getEntityInformations: getEntityInformations,
	getFieldInformations: getFieldInformations
};
