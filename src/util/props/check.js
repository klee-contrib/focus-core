import checkProps from 'react/lib/checkReactTypeSpec';

export default function validatePropTypes(propTypes, props, componentName) {
    if (__DEV__) {
        checkProps(propTypes, props, 'prop', componentName);
    }
} 

// Example
// import checkProps from 'focus-core/util/props/check'
//
// const props = {};
// const customPropTypes = { truc: PropTypes.string.isRequired };
// validatePropTypes(customPropTypes, props, 'test-function');

// Warning: Failed prop type: The prop `truc` is marked as required in `test-function`, but its value is `undefined`.
