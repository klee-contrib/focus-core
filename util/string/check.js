import ArgumentInvalidException from '../../exception/argument-invalid-exception';
import isString from 'lodash/lang/isString';

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {string} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
export default function (name, data) {
    if (!isString(data)) {
        throw new ArgumentInvalidException(`${name} should be a string`, data);
    }
}
