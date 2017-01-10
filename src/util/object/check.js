import ArgumentInvalidException from '../../exception/argument-invalid-exception';
import { isObject } from 'lodash';

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
function checkIsObject(name, data) {
    if (data !== undefined && !isObject(data)) {
        throw new ArgumentInvalidException(`${name} should be an object`, data);
    }
}
export default checkIsObject;