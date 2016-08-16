'use strict';

/**
 * Check if the given argument is a function.
 * @param {Function} functionToCheck
 * @returns {boolean} the check result
 */
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Create a cancellable promise object, with an optional cancel handler function given as an argument.
 * @param {Function} promiseFn
 * @param {Function} cancelHandler
 * @returns {Promise} the resulting Promise, with a cancel() method attached.
 */
function cancellablePromiseBuilder(promiseFn, cancelHandler) {
    if (!isFunction(promiseFn)) {
        throw new Error('Promise function ' + promiseFn + ' is not a function.');
    }
    if (cancelHandler && !isFunction(cancelHandler)) {
        throw new Error('Cancel handler ' + cancelHandler + ' is not a function.');
    }
    var p = new Promise(promiseFn);
    p.cancel = function cancelCurrentPromise() {
        if (cancelHandler) {
            // cancel handler exists, call it
            cancelHandler.call(this, arguments);
        } else {
            // cancel handler does not exist but was called, send a warning
            console.warn('Cancel() called on a CancellablePromise but no cancel handler function was provided at object creation.', this);
        }
    };
    p.isCancellable = function () {
        return cancelHandler !== undefined;
    };
    return p;
}

module.exports = cancellablePromiseBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBLFNBQVMsVUFBVCxDQUFvQixlQUFwQixFQUFxQztBQUNqQyxRQUFJLFVBQVUsRUFBZDtBQUNBLFdBQU8sbUJBQW1CLFFBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixlQUF0QixNQUEyQyxtQkFBckU7QUFDSDs7QUFFRDs7Ozs7O0FBTUEsU0FBUyx5QkFBVCxDQUFtQyxTQUFuQyxFQUE4QyxhQUE5QyxFQUE2RDtBQUN6RCxRQUFJLENBQUMsV0FBVyxTQUFYLENBQUwsRUFBNEI7QUFDeEIsY0FBTSxJQUFJLEtBQUosdUJBQThCLFNBQTlCLHlCQUFOO0FBQ0g7QUFDRCxRQUFJLGlCQUFpQixDQUFDLFdBQVcsYUFBWCxDQUF0QixFQUFpRDtBQUM3QyxjQUFNLElBQUksS0FBSixxQkFBNEIsYUFBNUIseUJBQU47QUFDSDtBQUNELFFBQUksSUFBSSxJQUFJLE9BQUosQ0FBWSxTQUFaLENBQVI7QUFDQSxNQUFFLE1BQUYsR0FBVyxTQUFTLG9CQUFULEdBQWdDO0FBQ3ZDLFlBQUcsYUFBSCxFQUFrQjtBQUFFO0FBQ2hCLDBCQUFjLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUIsU0FBekI7QUFDSCxTQUZELE1BRU87QUFBRTtBQUNMLG9CQUFRLElBQVIsQ0FBYSx5R0FBYixFQUF3SCxJQUF4SDtBQUNIO0FBQ0osS0FORDtBQU9BLE1BQUUsYUFBRixHQUFrQixZQUFXO0FBQ3pCLGVBQU8sa0JBQWtCLFNBQXpCO0FBQ0gsS0FGRDtBQUdBLFdBQU8sQ0FBUDtBQUNIOztBQUVELE9BQU8sT0FBUCxHQUFpQix5QkFBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvblRvQ2hlY2tcclxuICogQHJldHVybnMge2Jvb2xlYW59IHRoZSBjaGVjayByZXN1bHRcclxuICovXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XHJcbiAgICB2YXIgZ2V0VHlwZSA9IHt9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGNhbmNlbGxhYmxlIHByb21pc2Ugb2JqZWN0LCB3aXRoIGFuIG9wdGlvbmFsIGNhbmNlbCBoYW5kbGVyIGZ1bmN0aW9uIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9taXNlRm5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsSGFuZGxlclxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHJlc3VsdGluZyBQcm9taXNlLCB3aXRoIGEgY2FuY2VsKCkgbWV0aG9kIGF0dGFjaGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gY2FuY2VsbGFibGVQcm9taXNlQnVpbGRlcihwcm9taXNlRm4sIGNhbmNlbEhhbmRsZXIpIHtcclxuICAgIGlmICghaXNGdW5jdGlvbihwcm9taXNlRm4pKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9taXNlIGZ1bmN0aW9uICR7cHJvbWlzZUZufSBpcyBub3QgYSBmdW5jdGlvbi5gKTtcclxuICAgIH1cclxuICAgIGlmIChjYW5jZWxIYW5kbGVyICYmICFpc0Z1bmN0aW9uKGNhbmNlbEhhbmRsZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5jZWwgaGFuZGxlciAke2NhbmNlbEhhbmRsZXJ9IGlzIG5vdCBhIGZ1bmN0aW9uLmApO1xyXG4gICAgfVxyXG4gICAgdmFyIHAgPSBuZXcgUHJvbWlzZShwcm9taXNlRm4pO1xyXG4gICAgcC5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWxDdXJyZW50UHJvbWlzZSgpIHtcclxuICAgICAgICBpZihjYW5jZWxIYW5kbGVyKSB7IC8vIGNhbmNlbCBoYW5kbGVyIGV4aXN0cywgY2FsbCBpdFxyXG4gICAgICAgICAgICBjYW5jZWxIYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBjYW5jZWwgaGFuZGxlciBkb2VzIG5vdCBleGlzdCBidXQgd2FzIGNhbGxlZCwgc2VuZCBhIHdhcm5pbmdcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5jZWwoKSBjYWxsZWQgb24gYSBDYW5jZWxsYWJsZVByb21pc2UgYnV0IG5vIGNhbmNlbCBoYW5kbGVyIGZ1bmN0aW9uIHdhcyBwcm92aWRlZCBhdCBvYmplY3QgY3JlYXRpb24uJywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHAuaXNDYW5jZWxsYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjYW5jZWxIYW5kbGVyICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHA7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2FuY2VsbGFibGVQcm9taXNlQnVpbGRlcjsiXX0=