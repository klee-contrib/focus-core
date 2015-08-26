var ArgumentInvalidException = require(
	'../../exception/argument-invalid-exception');
var isString = require('lodash/lang/isString');

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {string} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
module.exports = function(name, data) {
	if (!isString(data)) {
		throw new ArgumentInvalidException(`${name} should be a string`, data);
	}
};
