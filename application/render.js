'use strict';
/*global document*/
 var React = require('react');
/**
 * Map containing all the mounted components.
 * @type {Object}
 */
var mountedComponents = require('./mounted-components');

var clearComponent = require('./clear');

/**
 *  Render a react component in a DOM selector.
 * @param {object} component - A react component.
 * @param {string} selector  - A selector on a DOM node.
 * @param {object} options   - Options for the component rendering.
 */
module.exports = function renderComponent(component, selector, options){
  options = options || {};
  // Clear a potential previously mounted component
  clearComponent(selector);
  // Render the component
  var mountedComponent = React.render(
    React.createElement(component, options.props, options.data),
    document.querySelector(selector)
  );
  //Save the fact that a component is mounted.
  mountedComponents[selector] = mountedComponent;
  console.info('Mounted components : ', Object.keys(mountedComponents));
  return mountedComponent;
};
/*
  Exemple
  var render = Focus.application.render;
  var MyComponent = require('./my-component');
  render(MyComponent, 'div.component-container', {props: {id: '12'}});
 */
