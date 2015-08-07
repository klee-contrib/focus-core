'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var SearchStore = (function (_CoreStore) {
    _inherits(SearchStore, _CoreStore);

    function SearchStore() {
        _classCallCheck(this, SearchStore);

        _CoreStore.apply(this, arguments);
    }

    SearchStore.prototype.getValue = function getValue() {
        return this.data.toJS();
    };

    return SearchStore;
})(CoreStore);

module.exports = SearchStore;