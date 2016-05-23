let _navigate, _back;

// Define the navigation functions depending on backbone or react-router
export const setNavigationFunctions = (navigate, back) => {
    _navigate = navigate;
    _back = back;
}


export const navigate = (...args) => {

    if(!_navigate){
        throw new Error('An error...')
    }
    _navigate(...args);
}

export const back = (...args) => {
    if(!_back){
        throw new Error('An error...')
    }
    _back(...args);
}
