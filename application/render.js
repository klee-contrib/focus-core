/*global document*/
//dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import mountedComponents from './mounted-components';
import clearComponent from './clear';

/**
*  Render a react component in a DOM selector.
* @param {object} component - A react component.
* @param {string} selector  - A selector on a DOM node.
* @param {object} options   - Options for the component rendering.
*/
export default function renderComponent(component, selector, options) {
    options = options || {};
    // Clear a potential previously mounted component
    clearComponent(selector);
    const targetDOMContainer = document.querySelector(selector);
    if (!targetDOMContainer) {
        throw new Error(`You are trying to render a component in a DOM element which is not existing, your selector is  ${selector}`);
    }
    // Render the component
    const mountedComponent = ReactDOM.render(
        React.createElement(component, options.props, options.data),
        targetDOMContainer
    );
    //Save the fact that a component is mounted.
    mountedComponents[selector] = mountedComponent;
    console.info('Mounted components : ', Object.keys(mountedComponents));
    return mountedComponent;
}
