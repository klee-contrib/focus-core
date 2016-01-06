//http://www.ascii-fr.com/Generateur-de-texte.html

// Check if we are bundling. If yes, package.json is found in ../ If no, then we are babelifying so it is in ./
const packageJsonPath = process.env.BUNDLING ? '..' : '.'
const infos = require(`${packageJsonPath}/package.json`);

console.log(
    `
        FOCUS CORE

        version: ${infos.version}
        focus: ${infos.homepage}
        documentation: ${infos.documentation}
        issues: ${infos.bugs.url}
    `
);
/**
* Focus library.
* This file requires all submodules.
* @type {Object}
*/
module.exports = {
    application: require('./application'),
    component: require('./component'),
    definition: require('./definition'),
    dispatcher: require('./dispatcher'),
    list: require('./list'),
    exception: require('./exception'),
    network: require('./network'),
    router: require('./router'),
    reference: require('./reference'),
    search: require('./search'),
    siteDescription: require('./site-description'),
    store: require('./store'),
    util: require('./util'),
    user: require('./user'),
    message: require('./message'),
    VERSION: infos.version,
    AUTHOR: infos.author,
    DOCUMENTATION(){
        console.log(`documentation: ${infos.documentation}`);
        console.log(`repository: ${infos.repository.url}`);
        console.log(`issues: ${infos.bugs.url}`);
    }
};
