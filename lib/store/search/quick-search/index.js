'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchStore = require('../search-store');
/**
 * Class standing for all advanced search information.
 * The state should be the complete state of the page.
 */

var QuickSearchStore = (function (_SearchStore) {
  _inherits(QuickSearchStore, _SearchStore);

  function QuickSearchStore(conf) {
    _classCallCheck(this, QuickSearchStore);

    conf = conf || {};
    conf.definition = {
      query: 'query',
      scope: 'scope',
      results: 'results',
      facets: 'facets',
      totalCount: 'totalCount'
    };
    conf.identifier = 'QUICK_SEARCH';
    _SearchStore.call(this, conf);
  }

  return QuickSearchStore;
})(SearchStore);

module.exports = QuickSearchStore;