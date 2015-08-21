//Dependencies.
const React = require('react');
const isString = require('lodash/lang/isString');
const isArray = require('lodash/lang/isArray');

/**
* Expose a React type validation for the component properties validation.
* @see http://facebook.github.io/react/docs/reusable-components.html
* @param   {string} type - String or array of the types to use.
* @param   {boolean} isRequired - Defines if the props is mandatory.
* @return {object} The corresponding react type.
*/
module.exports = function types(type, isRequired){
    const isStringType = isString(type);
    if(!isStringType && !isArray(type)){
        throw new Error('The type should be a string or an array');
    }
    //Container for the propTypes.
    let propTypeToReturn;
    //Array case.
    if(isStringType){
        propTypeToReturn = React.PropTypes[type];
    }else {
        propTypeToReturn = React.PropTypes.oneOfType(
            type.map(
                (t)=>{
                    return React.PropTypes[t];
                }));
    }
    //Mandatory case
    if(isRequired){
        propTypeToReturn = propTypeToReturn.isRequired;
    }
    return propTypeToReturn;
};
