/**
 * Check if the given argument is a function.
 * @param {Function} functionToCheck
 * @returns {boolean} the check result
 */
function isFunction(functionToCheck) {
    let getType = {};
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
        throw new Error(`Promise function ${promiseFn} is not a function.`);
    }
    if (cancelHandler && !isFunction(cancelHandler)) {
        throw new Error(`Cancel handler ${cancelHandler} is not a function.`);
    }
    let p = new Promise(promiseFn);
    p.cancel = function cancelCurrentPromise() {
        if (cancelHandler) { // cancel handler exists, call it
            cancelHandler.call(this, arguments);
        } else { // cancel handler does not exist but was called, send a warning
            console.warn('Cancel() called on a CancellablePromise but no cancel handler function was provided at object creation.', this);
        }
    };
    p.isCancellable = function () {
        return cancelHandler !== undefined;
    };
    return p;
}

export default cancellablePromiseBuilder;