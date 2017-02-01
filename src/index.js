//http://www.ascii-fr.com/Generateur-de-texte.html

import application from './application'
import history from './history'
import component from './component'
import definition from './definition'
import dispatcher from './dispatcher'
import list from './list'
import exception from './exception'
import network from './network'
import router from './router'
import reference from './reference'
import search from './search'
import siteDescription from './site-description'
import store from './store'
import util from './util'
import user from './user'
import translation from './translation'
import message from './message'

const infos = require(`${__PACKAGE_JSON_PATH__}/package.json`);
const { version, author, homepage, documentation, bugs, repository } = infos;
const DOCUMENTATION = () => {
    console.log(`documentation: ${documentation}`);
    console.log(`repository: ${repository.url}`);
    console.log(`issues: ${bugs.url}`);
}; 

console.log(
    `
        FOCUS CORE

        version: ${version}
        focus: ${homepage}
        documentation: ${documentation}
        issues: ${bugs.url}
    `
);
/**
* Focus library.
* This file requires all submodules.
* @type {Object}
*/
export {
    application,
    history,
    component,
    definition,
    dispatcher,
    list,
    exception,
    network,
    router,
    reference,
    search,
    siteDescription,
    store,
    util,
    user,
    translation,
    message,
    DOCUMENTATION,
    version as VERSION,
    author as AUTHOR
}

export default {
    application,
    history,
    component,
    definition,
    dispatcher,
    list,
    exception,
    network,
    router,
    reference,
    search,
    siteDescription,
    store,
    util,
    user,
    translation,
    message,
    DOCUMENTATION,
    VERSION: version,
    AUTHOR: author
};

