'use strict';

var merge = require('lodash/object/merge');

var _require = require('lodash/lang');

var isObject = _require.isObject;
var clone = _require.clone;

/**
 * Configuration object.
 * @type {{CORS: boolean}}
 */
var configuration = {
  CORS: true,
  xhrErrors: {}
};

/**
 * Function which overrides the configuration.
 * @param conf
 */
function configure(conf) {
  if (isObject(conf)) {
    merge(configuration, conf);
  }
}

module.exports = {
  configure: configure,
  get: function get() {
    return clone(configuration);
  }
};