/**
 * Clear a DOM node.
 * If it does not exist, send a warning to the console.
 * @param {String} targetSelector - the target node's selector
 */
module.exports = function clearDOMNode(targetSelector) {
    if (document.querySelector(targetSelector)) {
        document.querySelector(targetSelector).innerHTML = '';
    } else {
        console.warn(`Tried to clear content of ${targetSelector}, but could not find it in the current page.`);
    }
};
