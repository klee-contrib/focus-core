var ArgumentNullException = require('../../exception/ArgumentNullException');
var isNull = require('lodash/lang/isNull');

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
module.exports = function(name, data) {
	if (!isNull(data)) {
		throw new ArgumentNullException(`${name} should be defined`, data);
	}
};
