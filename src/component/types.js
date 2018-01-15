//Dependencies.
import PropTypes from 'prop-types';
import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';

/**
* Expose a React type validation for the component properties validation.
* @see http://facebook.github.io/react/docs/reusable-components.html
* @param   {string} type - String or array of the types to use.
* @param   {boolean} isRequired - Defines if the props is mandatory.
* @return {object} The corresponding react type.
*/
export default function types(type, isRequired) {
    const isStringType = isString(type);
    if (!isStringType && !isArray(type)) {
        throw new Error('The type should be a string or an array');
    }
    //Container for the propTypes.
    let propTypeToReturn;
    //Array case.
    if (isStringType) {
        propTypeToReturn = PropTypes[type];
    } else {
        propTypeToReturn = PropTypes.oneOfType(
            type.map(
                (t) => {
                    return PropTypes[t];
                }));
    }
    //Mandatory case
    if (isRequired) {
        propTypeToReturn = propTypeToReturn.isRequired;
    }
    return propTypeToReturn;
}