let _navigate, _back;

// Define the navigation functions depending on backbone or react-router
export const setNavigationFunctions = (navigate, back) => {
    _navigate = navigate;
    _back = back;
}

export const navigate = (...args) => {
    if(window.Backbone) {
        window.Backbone.history.navigate(...args);
    }
    else if (!window.Backbone && _navigate){
        _navigate(...args);
    }
    else {
        throw new Error('react-router or backbone URL Navigation was badly given in the setNavigationFunctions()')
    }
}

export const back = (...args) => {
    if(!_back){
        throw new Error('react-router or backbone Previous Page Navigation was badly given in the setNavigationFunctions()')
    }
    _back(...args);
}
