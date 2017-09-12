import builder from './builder';
import reader from './reader';

/**
 * @description Get th site structure processed with the user roles.
 * @return {object} - The user site structure.
 */
function getUserSiteStructure() {
    //Seems wiered looking like a ci
    return builder.getSiteStructure();
}

export {
    builder,
    reader,
    getUserSiteStructure
};

export default {
    builder,
    reader,
    getUserSiteStructure
};