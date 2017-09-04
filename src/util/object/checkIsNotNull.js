/* eslint-disable filenames/match-regex */
import ArgumentNullException from '../../exception/argument-null-exception';

import isUndefined from 'lodash/lang/isUndefined';
import isNull from 'lodash/lang/isNull';

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @returns {undefined} - Return nothing, throw an Exception if this is not valid.
 * @example var objToTest = { papa : "singe"}; isNull('objToTest', objToTest);
 */
export default function (name, data) {
    if (isNull(data) || isUndefined(data)) {
        throw new ArgumentNullException(`${name} should be defined`);
    }
}
