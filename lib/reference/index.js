'use strict';

module.exports = {
  config: require('./config'),
  builder: require('./builder'),
  builtInAction: require('./built-in-action'),
  getStore: function getStore() {
    return require('./built-in-store');
  }
};