

/**
 * Rename a function to a new name, for call stack and debugging
 *
 * @param {Function} func the function to rename
 * @param {String} newName the new name
 */
function renameFunction(func, newName) {
    // eslint-disable-next-line no-unused-vars
    const prop = Object.getOwnPropertyDescriptor(func, 'name');
    if (prop) {
        const { value, ...others } = prop;
        Object.defineProperty(func, 'name', { value: newName, ...others });
    }
}

export default renameFunction;