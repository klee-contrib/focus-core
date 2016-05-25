let _navigate, _back;

// Define the navigation functions depending on backbone or react-router
export const setNavigationFunctions = (navigate, back) => {
    _navigate = navigate;
    _back = back;
    window._navigate = navigate;
    window._back = back;
}

export const navigate = (...args) => {
    if(!_navigate){
        if(!window._navigate) {
            throw new Error('react-router or backbone URL Navigation was badly given in the setNavigationFunctions()')
        }
        else {
            window._navigate(...args);
        }
    }
    else {
        _navigate(...args);
    }
}

export const back = (...args) => {
    if(!_back){
        window._back(...args);
        throw new Error('react-router or backbone Previous Page Navigation was badly given in the setNavigationFunctions()')
    }
    _back(...args);
}
