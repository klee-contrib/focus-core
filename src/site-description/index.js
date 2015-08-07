let _builder = require('./builder');
/**
 * @description Get th site structure processed with the user roles.
 * @return {object} - The user site structure.
 */
function getUserSiteStructure(){
  //Seems wiered looking like a ci
  return _builder.getSiteStructure();
}

module.exports = {
  builder: _builder,
  reader: require('./reader'),
  getUserSiteStructure: getUserSiteStructure
};
