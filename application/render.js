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
module.exports = function(component, selector, options){
  options = options || {};
  // Clear a potential previously mounted component
  clearComponent(selector);
  // Render the component
  React.render(
    React.createElement(component, options.props, options.data),
    document.querySelector(selector)
  );
  //Save the fact that a component is mounted.
  mountedComponents[selector] = true;
  console.info('Mounted components : ', Object.keys(mountedComponents));
};
/*
  Exemple
  var render = Focus.application.render;
  var MyComponent = require('./my-component');
  render(MyComponent, 'div.component-container', {props: {id: '12'}});
 */
