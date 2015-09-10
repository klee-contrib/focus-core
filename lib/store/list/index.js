'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
/**
 * Store definition.
 * @type {Object}
 */
var DEFINITION = {
    criteria: 'criteria',
    groupingKey: 'groupingKey',
    sortBy: 'sortBy',
    sortAsc: 'sortAsc',
    dataList: 'dataList',
    totalCount: 'totalCount'
};

/**
 * Class standing for all list information.
 * The list has almost the same data as the search store but instead of the facets, it can have a .
 */

var ListStore = (function (_CoreStore) {
    _inherits(ListStore, _CoreStore);

    function ListStore(conf) {
        _classCallCheck(this, ListStore);

        conf = conf || {};
        if (!conf.identifier) {
            throw new Error('\n            The identifier is necessary, maybe it should be the name of the entity which is in the List.\n            Your code should look like let myListStore = new ListStore({identifier: \'myEntityList\'}) or something like that.\n           ');
        }
        conf.definition = DEFINITION;
        _CoreStore.call(this, conf);
    }

    return ListStore;
})(CoreStore);

module.exports = ListStore;