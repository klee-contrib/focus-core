

/**
 * Rename a function to a new name, for call stack and debugging
 *
 * @param {Function} func the function to rename
 * @param {String} newName the new name
 */
function renameFunction(func, newName) {
    // eslint-disable-next-line no-unused-vars
    const { value, ...others } = Object.getOwnPropertyDescriptor(func, 'name');
    Object.defineProperty(func, 'name', { value: newName, ...others });
}

export default renameFunction;