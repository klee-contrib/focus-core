var React = require('react');
var assign = require('object-assign');
var isObject = require('lodash/lang/isObject');
var isFunction = require('lodash/lang/isFunction');
/**
 * Build a module with a mixin and a React component.
 * @param  {object} componentMixin - Mixin of the component.
 * @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
 */
module.exports = function(componentMixin){
  return {
    mixin: componentMixin,

    /*extend: function extendMixin(properties){
      if(isFunction(componentMixin)){
        throw new Error('You cannot extend a mixin function');
      }
      if(!isObject(properties)){
        throw new Error('properties should be an object');
      }
      return assign({}, componentMixin, properties);
    },*/
    component: React.createClass(componentMixin)
  };
};
