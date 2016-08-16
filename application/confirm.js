'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = confirm;

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function aims to have the same behaviour as JS confirm.
 * @param  {string | numver | component} ContentComponent - The component to display in the conform message.
 * @return {Promise}Confirm is a promise in order to be able to provide success and error callbacks.
 */
function confirm(ContentComponent, props) {
    return new Promise(function (resolve, reject) {
        _dispatcher2.default.handleViewAction({
            data: {
                confirmConfig: _extends({
                    isVisible: true,
                    Content: ContentComponent,
                    handleCancel: function handleCancel(err) {
                        _dispatcher2.default.handleViewAction({ data: { confirmConfig: { isVsible: false, Content: null } }, type: 'update' });
                        //Maybe there is a little async problem.
                        // We could listen to the store once on the change it is time to call resolve.
                        reject(err);
                    },
                    handleConfirm: function handleConfirm(data) {
                        _dispatcher2.default.handleViewAction({ data: { confirmConfig: { isVsible: false, Content: null } }, type: 'update' });
                        resolve(data);
                    }
                }, props)
            },
            type: 'update'
        });
    });
}

//Example call
///**
/// confirm('Is it good for you ?').then(() => action.save()).catch(() => displaySave())
/// confirm(MyAwesomeComponentWhichWillBeRenderAsCOntent).then(() => action.save()).catch(() => displaySave())
////

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFPd0IsTzs7QUFQeEI7Ozs7OztBQUVBOzs7OztBQUtlLFNBQVMsT0FBVCxDQUFpQixnQkFBakIsRUFBbUMsS0FBbkMsRUFBMEM7QUFDckQsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3BDLDZCQUFXLGdCQUFYLENBQTRCO0FBQ3hCLGtCQUFNO0FBQ0Y7QUFDSSwrQkFBVyxJQURmO0FBRUksNkJBQVMsZ0JBRmI7QUFHSSxnQ0FISix3QkFHaUIsR0FIakIsRUFHc0I7QUFDZCw2Q0FBVyxnQkFBWCxDQUE0QixFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsVUFBVSxLQUFYLEVBQWtCLFNBQVMsSUFBM0IsRUFBaEIsRUFBUCxFQUEwRCxNQUFNLFFBQWhFLEVBQTVCO0FBQ0E7QUFDQTtBQUNBLCtCQUFPLEdBQVA7QUFDSCxxQkFSTDtBQVNJLGlDQVRKLHlCQVNrQixJQVRsQixFQVN3QjtBQUNoQiw2Q0FBVyxnQkFBWCxDQUE0QixFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsVUFBVSxLQUFYLEVBQWtCLFNBQVMsSUFBM0IsRUFBaEIsRUFBUCxFQUEwRCxNQUFNLFFBQWhFLEVBQTVCO0FBQ0EsZ0NBQVEsSUFBUjtBQUNIO0FBWkwsbUJBYU8sS0FiUDtBQURFLGFBRGtCO0FBa0J4QixrQkFBTTtBQWxCa0IsU0FBNUI7QUFvQkgsS0FyQk0sQ0FBUDtBQXNCSDs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXInO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gYWltcyB0byBoYXZlIHRoZSBzYW1lIGJlaGF2aW91ciBhcyBKUyBjb25maXJtLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBudW12ZXIgfCBjb21wb25lbnR9IENvbnRlbnRDb21wb25lbnQgLSBUaGUgY29tcG9uZW50IHRvIGRpc3BsYXkgaW4gdGhlIGNvbmZvcm0gbWVzc2FnZS5cclxuICogQHJldHVybiB7UHJvbWlzZX1Db25maXJtIGlzIGEgcHJvbWlzZSBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHByb3ZpZGUgc3VjY2VzcyBhbmQgZXJyb3IgY2FsbGJhY2tzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlybShDb250ZW50Q29tcG9uZW50LCBwcm9wcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjb25maXJtQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnQ6IENvbnRlbnRDb21wb25lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe2RhdGE6IHtjb25maXJtQ29uZmlnOiB7aXNWc2libGU6IGZhbHNlLCBDb250ZW50OiBudWxsfX0sIHR5cGU6ICd1cGRhdGUnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhlcmUgaXMgYSBsaXR0bGUgYXN5bmMgcHJvYmxlbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY291bGQgbGlzdGVuIHRvIHRoZSBzdG9yZSBvbmNlIG9uIHRoZSBjaGFuZ2UgaXQgaXMgdGltZSB0byBjYWxsIHJlc29sdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ29uZmlybShkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YToge2NvbmZpcm1Db25maWc6IHtpc1ZzaWJsZTogZmFsc2UsIENvbnRlbnQ6IG51bGx9fSwgdHlwZTogJ3VwZGF0ZSd9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLnByb3BzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6ICd1cGRhdGUnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8vRXhhbXBsZSBjYWxsXHJcbi8vLyoqXHJcbi8vLyBjb25maXJtKCdJcyBpdCBnb29kIGZvciB5b3UgPycpLnRoZW4oKCkgPT4gYWN0aW9uLnNhdmUoKSkuY2F0Y2goKCkgPT4gZGlzcGxheVNhdmUoKSlcclxuLy8vIGNvbmZpcm0oTXlBd2Vzb21lQ29tcG9uZW50V2hpY2hXaWxsQmVSZW5kZXJBc0NPbnRlbnQpLnRoZW4oKCkgPT4gYWN0aW9uLnNhdmUoKSkuY2F0Y2goKCkgPT4gZGlzcGxheVNhdmUoKSlcclxuLy8vL1xyXG4iXX0=