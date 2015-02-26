/*global document*/
 var React = require('react');
 var mountedComponents  = {};
/**
 * Render a react component in the DOM.
 * @type {undefined}
 * @param component - A react component.
 * @param selector  - A selector on a DOM node.
 * @param options   - Options for the component rendering.
 */
module.exports =  (component,selector, options) =>{
  options = options || {};
  //Unmount component if there is one mounted.
  if(mountedComponents[selector]){
    React.unmountComponentAtNode(document.getElementById(selector));
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
