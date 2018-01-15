let _navigate, _back, _start;

// Define the navigation functions depending on backbone or react-router
const setNavigationFunctions = (navigate, back, start) => {
    _navigate = navigate;
    _back = back;
    _start = start;
}

const navigate = (...args) => {
    if (!_navigate) {
        throw new Error('react-router or backbone URL Navigation was badly given in the setNavigationFunctions()')
    }
    _navigate(...args);
}

const back = (...args) => {
    if (!_back) {
        throw new Error('react-router or backbone Previous Page Navigation was badly given in the setNavigationFunctions()')
    }
    _back(...args);
}

const start = (...args) => {
    if (!_start) {
        throw new Error('Backbone start router was badly given in the setNavigationFunctions()')
    }
    _start(...args);
}

export {
    setNavigationFunctions,
    navigate,
    back,
    start
}

export default {
    setNavigationFunctions,
    navigate,
    back,
    start
}