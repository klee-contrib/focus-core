var infos = require('../package.json');
/**
 * Focus library.
 * This file requires all submodules.
 * @type {Object}
 */
module.exports = {
  application: require('./application'),
  component: require('./component'),
  helper: require('./helper'),
  network: require('./network'),
  router: require('./router'),
  store: require('./store'),
  util: require('./util'),
  VERSION: infos.version,
  AUTHOR: infos.author,
  DOCUMENTATION: infos.documentation
};
