'use strict';

var React = require('react');
var assign = require('object-assign');
//var isObject = require('lodash/lang/isObject');
//var isFunction = require('lodash/lang/isFunction');

/**
* Create a component with a mixin except id the component is mixin only.
* @param {object}  mixin - The component mixin.
* @param {Boolean} isMixinOnly - define if the component is a mixin only.
* @return {object} - {component} the built react component.
*/
function createComponent(mixin, isMixinOnly) {
    if (isMixinOnly) {
        return null;
    }
    return { component: React.createClass(mixin) };
}

/**
* Build a module with a mixin and a React component.
* @param  {object} componentMixin - Mixin of the component.
* @param {boolean} isMixinOnly - Bolean to set .
* @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
*/
module.exports = function builder(componentMixin, isMixinOnly) {
    return assign({ mixin: componentMixin }, createComponent(componentMixin, isMixinOnly));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU0sU0FBUyxRQUFRLGVBQVIsQ0FBZjtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztBQU1BLFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQyxXQUFoQyxFQUE0QztBQUN4QyxRQUFJLFdBQUosRUFBZ0I7QUFDWixlQUFPLElBQVA7QUFDSDtBQUNELFdBQU8sRUFBQyxXQUFXLE1BQU0sV0FBTixDQUFrQixLQUFsQixDQUFaLEVBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFNBQVMsT0FBVCxDQUFpQixjQUFqQixFQUFpQyxXQUFqQyxFQUE2QztBQUMxRCxXQUFPLE9BQ0gsRUFBQyxPQUFPLGNBQVIsRUFERyxFQUVILGdCQUFnQixjQUFoQixFQUFnQyxXQUFoQyxDQUZHLENBQVA7QUFJSCxDQUxEIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG4vL3ZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzT2JqZWN0Jyk7XHJcbi8vdmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uJyk7XHJcblxyXG4vKipcclxuKiBDcmVhdGUgYSBjb21wb25lbnQgd2l0aCBhIG1peGluIGV4Y2VwdCBpZCB0aGUgY29tcG9uZW50IGlzIG1peGluIG9ubHkuXHJcbiogQHBhcmFtIHtvYmplY3R9ICBtaXhpbiAtIFRoZSBjb21wb25lbnQgbWl4aW4uXHJcbiogQHBhcmFtIHtCb29sZWFufSBpc01peGluT25seSAtIGRlZmluZSBpZiB0aGUgY29tcG9uZW50IGlzIGEgbWl4aW4gb25seS5cclxuKiBAcmV0dXJuIHtvYmplY3R9IC0ge2NvbXBvbmVudH0gdGhlIGJ1aWx0IHJlYWN0IGNvbXBvbmVudC5cclxuKi9cclxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG1peGluLCBpc01peGluT25seSl7XHJcbiAgICBpZiAoaXNNaXhpbk9ubHkpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtjb21wb25lbnQ6IFJlYWN0LmNyZWF0ZUNsYXNzKG1peGluKX07XHJcbn1cclxuXHJcbi8qKlxyXG4qIEJ1aWxkIGEgbW9kdWxlIHdpdGggYSBtaXhpbiBhbmQgYSBSZWFjdCBjb21wb25lbnQuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBjb21wb25lbnRNaXhpbiAtIE1peGluIG9mIHRoZSBjb21wb25lbnQuXHJcbiogQHBhcmFtIHtib29sZWFufSBpc01peGluT25seSAtIEJvbGVhbiB0byBzZXQgLlxyXG4qIEByZXR1cm4ge29iamVjdH0ge21peGluOiAndGhlIGNvbXBvbmVudCBtaXhpbicsIGNvbXBvbmVudDogJ3RoZSByZWFjdCBpbnN0YW5jaWF0ZWQgY29tcG9uZW50J31cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZGVyKGNvbXBvbmVudE1peGluLCBpc01peGluT25seSl7XHJcbiAgICByZXR1cm4gYXNzaWduKFxyXG4gICAgICAgIHttaXhpbjogY29tcG9uZW50TWl4aW59LFxyXG4gICAgICAgIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRNaXhpbiwgaXNNaXhpbk9ubHkpXHJcbiAgICApO1xyXG59O1xyXG4iXX0=