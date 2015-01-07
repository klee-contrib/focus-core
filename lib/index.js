var infos = require('../package.json');
//Register handlebars helpers
var registerTemplateHelpers = require('./helpers/view_helper');
registerTemplateHelpers(require("hbsfy/runtime"));

module.exports = {
  VERSION: infos.version,
  AUTHOR: infos.author,
  DOCUMENTATION: infos.documentation,
  Core: require('./core'),
  Models: require('./models'),
  Views: require('./views'),
  Helpers: require('./helpers'),
  util: require('./util'),
  initialize: require('./initialize'),
  registerTemplateHelpers: registerTemplateHelpers
};