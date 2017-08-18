import isString from 'lodash/lang/isString';

/**
 * Validate a string given options.
 * @param  {string} stringToTest - The string to test.
 * @param  {object} options - Validators options, supports minLength and maxLength both optionals.
 * @return {boolean} - True if the string is valid , false otherwise.
 */
export default function stringLength(stringToTest, options = {}) {
    if (!isString(stringToTest)) {
        return false;
    }
    options.minLength = options.minLength || 0;
    const isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
    const isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
    return isMinLength && isMaxLength;
}
