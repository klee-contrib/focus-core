var infos = require('../package.json');
require('./helpers/view_helper');
module.exports = {
  VERSION: infos.version,
  AUTHOR: infos.author,
  Core: require('./core'),
  Models: require('./models'),
  Views: require('./views'),
  Helpers: require('./helpers'),
  util: require('./util'),
  initialize: require('./initialize')
};