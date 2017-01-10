import ArgumentNullException from '../../exception/argument-null-exception';
import { isNull, isUndefined } from 'lodash';

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @returns {undefined} - Return nothing, throw an Exception if this is not valid.
 * @example var objToTest = { papa : "singe"}; isNull('objToTest', objToTest);
 */
function checkIsNotNull(name, data) {
    if (isNull(data) || isUndefined(data)) {
        throw new ArgumentNullException(`${name} should be defined`);
    }
}
export default checkIsNotNull;