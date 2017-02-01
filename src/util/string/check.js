import ArgumentInvalidException from '../../exception/argument-invalid-exception';
import { isString } from 'lodash';

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {string} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
function checkIsString(name, data) {
    if (!isString(data)) {
        throw new ArgumentInvalidException(`${name} should be a string`, data);
    }
}

export default checkIsString;
