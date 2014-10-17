/*global _*/
//Dependencies
var CoreView = require('../core/index');


/**
 * Container for all the detail view specificities.
 * @type {Object}
 */
var detailView = {};
_.extend(detailView,require('./detail-options'), require('./detail-action'), require('./detail-interaction'), require('detail-ui'));


/**
 * [exports description]
 * @type {[type]}
 */
module.exports = CoreView.extend(detailView);