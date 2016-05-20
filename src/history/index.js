 let _navigate, _back;

// Define the navigation functions depending on backbone or react-router
export const setNavigationFunctions = (navigate, back) => {
    _navigate = navigate;
    _back = back;
}


export const navigate = () => {

    if(!_navigate){
        throw new Error('An error...')
    }
    _navigate.call(arguments);
}

export const back = () => {
    if(!_back){
        throw new Error('An error...')
    }
    _back.call(arguments);
}
