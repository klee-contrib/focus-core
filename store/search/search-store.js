'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CoreStore = require('../CoreStore');
/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var SearchStore = function (_CoreStore) {
    _inherits(SearchStore, _CoreStore);

    function SearchStore() {
        _classCallCheck(this, SearchStore);

        return _possibleConstructorReturn(this, _CoreStore.apply(this, arguments));
    }

    SearchStore.prototype.getValue = function getValue() {
        return this.data.toJS();
    };

    return SearchStore;
}(CoreStore);

module.exports = SearchStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxZQUFZLFFBQVEsY0FBUixDQUFoQjtBQUNBOzs7OztJQUlNLFc7Ozs7Ozs7OzswQkFDRixRLHVCQUFXO0FBQ1AsZUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQVA7QUFDSCxLOzs7RUFIcUIsUzs7QUFNMUIsT0FBTyxPQUFQLEdBQWlCLFdBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBDb3JlU3RvcmUgPSByZXF1aXJlKCcuLi9Db3JlU3RvcmUnKTtcclxuLyoqXHJcbiogQ2xhc3Mgc3RhbmRpbmcgZm9yIGFsbCBhZHZhbmNlZCBzZWFyY2ggaW5mb3JtYXRpb24uXHJcbiogVGhlIHN0YXRlIHNob3VsZCBiZSB0aGUgY29tcGxldGUgc3RhdGUgb2YgdGhlIHBhZ2UuXHJcbiovXHJcbmNsYXNzIFNlYXJjaFN0b3JlIGV4dGVuZHMgQ29yZVN0b3Jle1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50b0pTKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoU3RvcmU7XHJcbiJdfQ==