//http://www.ascii-fr.com/Generateur-de-texte.html
'use strict';

var infos = require('../package.json');
console.log('\n  _____   _____   _____   _   _   _____\n |  ___| /  _  \\ /  ___| | | | | /  ___/\n | |__   | | | | | |     | | | | | |___\n |  __|  | | | | | |     | | | | \\___  \\\n | |     | |_| | | |___  | |_| |  ___| |\n |_|     \\_____/ \\_____| \\_____/ /_____/\n\n version: ' + infos.version + '\n focus: ' + infos.homepage + '\n documentation: ' + infos.documentation + '\n issues: ' + infos.bugs.url + '\n');
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
    DOCUMENTATION: function DOCUMENTATION() {
        console.log('documentation: ' + infos.documentation);
        console.log('repository: ' + infos.repository.url);
        console.log('issues: ' + infos.bugs.url);
    }
};