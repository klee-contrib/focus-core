'use strict';
/*global document*/
 var React = require('react');
/**
 * Map containing all the mounted components.
 * @type {Object}
 */
 var mountedComponents = {};

/**
 *  Render a react component in a DOM selector.
 * @param {object} component - A react component.
 * @param {string} selector  - A selector on a DOM node.
 * @param {object} options   - Options for the component rendering.
 */
module.exports = function(component, selector, options){
  options = options || {};
  //Unmount component if there is one mounted.
  if(mountedComponents[selector]){
    React.unmountComponentAtNode(document.querySelector(selector));
    console.log('component unmounted');
  }
  React.render(
    React.createElement(component, options.props, options.data),
    document.querySelector(selector)
  );
  //Save the fact that a comonent is mounted.
  mountedComponents[selector] = true;
  console.log('Mounted components : ', mountedComponents);
};
