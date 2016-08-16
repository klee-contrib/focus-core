'use strict';

//Dependencies.
var React = require('react');
var isString = require('lodash/lang/isString');
var isArray = require('lodash/lang/isArray');

/**
* Expose a React type validation for the component properties validation.
* @see http://facebook.github.io/react/docs/reusable-components.html
* @param   {string} type - String or array of the types to use.
* @param   {boolean} isRequired - Defines if the props is mandatory.
* @return {object} The corresponding react type.
*/
module.exports = function types(type, isRequired) {
    var isStringType = isString(type);
    if (!isStringType && !isArray(type)) {
        throw new Error('The type should be a string or an array');
    }
    //Container for the propTypes.
    var propTypeToReturn = void 0;
    //Array case.
    if (isStringType) {
        propTypeToReturn = React.PropTypes[type];
    } else {
        propTypeToReturn = React.PropTypes.oneOfType(type.map(function (t) {
            return React.PropTypes[t];
        }));
    }
    //Mandatory case
    if (isRequired) {
        propTypeToReturn = propTypeToReturn.isRequired;
    }
    return propTypeToReturn;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTSxXQUFXLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNLFVBQVUsUUFBUSxxQkFBUixDQUFoQjs7QUFFQTs7Ozs7OztBQU9BLE9BQU8sT0FBUCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLFVBQXJCLEVBQWdDO0FBQzdDLFFBQU0sZUFBZSxTQUFTLElBQVQsQ0FBckI7QUFDQSxRQUFHLENBQUMsWUFBRCxJQUFpQixDQUFDLFFBQVEsSUFBUixDQUFyQixFQUFtQztBQUMvQixjQUFNLElBQUksS0FBSixDQUFVLHlDQUFWLENBQU47QUFDSDtBQUNEO0FBQ0EsUUFBSSx5QkFBSjtBQUNBO0FBQ0EsUUFBRyxZQUFILEVBQWdCO0FBQ1osMkJBQW1CLE1BQU0sU0FBTixDQUFnQixJQUFoQixDQUFuQjtBQUNILEtBRkQsTUFFTTtBQUNGLDJCQUFtQixNQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FDZixLQUFLLEdBQUwsQ0FDSSxVQUFDLENBQUQsRUFBSztBQUNELG1CQUFPLE1BQU0sU0FBTixDQUFnQixDQUFoQixDQUFQO0FBQ0gsU0FITCxDQURlLENBQW5CO0FBS0g7QUFDRDtBQUNBLFFBQUcsVUFBSCxFQUFjO0FBQ1YsMkJBQW1CLGlCQUFpQixVQUFwQztBQUNIO0FBQ0QsV0FBTyxnQkFBUDtBQUNILENBdEJEIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IGlzU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNTdHJpbmcnKTtcclxuY29uc3QgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzQXJyYXknKTtcclxuXHJcbi8qKlxyXG4qIEV4cG9zZSBhIFJlYWN0IHR5cGUgdmFsaWRhdGlvbiBmb3IgdGhlIGNvbXBvbmVudCBwcm9wZXJ0aWVzIHZhbGlkYXRpb24uXHJcbiogQHNlZSBodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmV1c2FibGUtY29tcG9uZW50cy5odG1sXHJcbiogQHBhcmFtICAge3N0cmluZ30gdHlwZSAtIFN0cmluZyBvciBhcnJheSBvZiB0aGUgdHlwZXMgdG8gdXNlLlxyXG4qIEBwYXJhbSAgIHtib29sZWFufSBpc1JlcXVpcmVkIC0gRGVmaW5lcyBpZiB0aGUgcHJvcHMgaXMgbWFuZGF0b3J5LlxyXG4qIEByZXR1cm4ge29iamVjdH0gVGhlIGNvcnJlc3BvbmRpbmcgcmVhY3QgdHlwZS5cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0eXBlcyh0eXBlLCBpc1JlcXVpcmVkKXtcclxuICAgIGNvbnN0IGlzU3RyaW5nVHlwZSA9IGlzU3RyaW5nKHR5cGUpO1xyXG4gICAgaWYoIWlzU3RyaW5nVHlwZSAmJiAhaXNBcnJheSh0eXBlKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdHlwZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXknKTtcclxuICAgIH1cclxuICAgIC8vQ29udGFpbmVyIGZvciB0aGUgcHJvcFR5cGVzLlxyXG4gICAgbGV0IHByb3BUeXBlVG9SZXR1cm47XHJcbiAgICAvL0FycmF5IGNhc2UuXHJcbiAgICBpZihpc1N0cmluZ1R5cGUpe1xyXG4gICAgICAgIHByb3BUeXBlVG9SZXR1cm4gPSBSZWFjdC5Qcm9wVHlwZXNbdHlwZV07XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgcHJvcFR5cGVUb1JldHVybiA9IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoXHJcbiAgICAgICAgICAgIHR5cGUubWFwKFxyXG4gICAgICAgICAgICAgICAgKHQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LlByb3BUeXBlc1t0XTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIC8vTWFuZGF0b3J5IGNhc2VcclxuICAgIGlmKGlzUmVxdWlyZWQpe1xyXG4gICAgICAgIHByb3BUeXBlVG9SZXR1cm4gPSBwcm9wVHlwZVRvUmV0dXJuLmlzUmVxdWlyZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvcFR5cGVUb1JldHVybjtcclxufTtcclxuIl19