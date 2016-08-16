'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

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

var ListStore = function (_CoreStore) {
    _inherits(ListStore, _CoreStore);

    function ListStore(conf) {
        _classCallCheck(this, ListStore);

        conf = conf || {};
        if (!conf.identifier) {
            throw new Error('\n            The identifier is necessary, maybe it should be the name of the entity which is in the List.\n            Your code should look like let myListStore = new ListStore({identifier: \'myEntityList\'}) or something like that.\n           ');
        }
        conf.definition = DEFINITION;
        return _possibleConstructorReturn(this, _CoreStore.call(this, conf));
    }

    return ListStore;
}(CoreStore);

module.exports = ListStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxZQUFZLFFBQVEsY0FBUixDQUFoQjtBQUNBOzs7O0FBSUEsSUFBTSxhQUFhO0FBQ2YsY0FBVSxVQURLO0FBRWYsaUJBQWEsYUFGRTtBQUdmLFlBQVEsUUFITztBQUlmLGFBQVMsU0FKTTtBQUtmLGNBQVUsVUFMSztBQU1mLGdCQUFZO0FBTkcsQ0FBbkI7O0FBU0E7Ozs7O0lBSU0sUzs7O0FBQ0osdUJBQVksSUFBWixFQUFpQjtBQUFBOztBQUNiLGVBQU8sUUFBUSxFQUFmO0FBQ0EsWUFBRyxDQUFDLEtBQUssVUFBVCxFQUFvQjtBQUNoQixrQkFBTSxJQUFJLEtBQUosMlBBQU47QUFNSDtBQUNELGFBQUssVUFBTCxHQUFrQixVQUFsQjtBQVZhLGdEQVdiLHNCQUFNLElBQU4sQ0FYYTtBQVloQjs7O0VBYnFCLFM7O0FBZXhCLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQ29yZVN0b3JlID0gcmVxdWlyZSgnLi4vQ29yZVN0b3JlJyk7XHJcbi8qKlxyXG4gKiBTdG9yZSBkZWZpbml0aW9uLlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuY29uc3QgREVGSU5JVElPTiA9IHtcclxuICAgIGNyaXRlcmlhOiAnY3JpdGVyaWEnLFxyXG4gICAgZ3JvdXBpbmdLZXk6ICdncm91cGluZ0tleScsXHJcbiAgICBzb3J0Qnk6ICdzb3J0QnknLFxyXG4gICAgc29ydEFzYzogJ3NvcnRBc2MnLFxyXG4gICAgZGF0YUxpc3Q6ICdkYXRhTGlzdCcsXHJcbiAgICB0b3RhbENvdW50OiAndG90YWxDb3VudCdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBzdGFuZGluZyBmb3IgYWxsIGxpc3QgaW5mb3JtYXRpb24uXHJcbiAqIFRoZSBsaXN0IGhhcyBhbG1vc3QgdGhlIHNhbWUgZGF0YSBhcyB0aGUgc2VhcmNoIHN0b3JlIGJ1dCBpbnN0ZWFkIG9mIHRoZSBmYWNldHMsIGl0IGNhbiBoYXZlIGEgLlxyXG4gKi9cclxuY2xhc3MgTGlzdFN0b3JlIGV4dGVuZHMgQ29yZVN0b3Jle1xyXG4gIGNvbnN0cnVjdG9yKGNvbmYpe1xyXG4gICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgaWYoIWNvbmYuaWRlbnRpZmllcil7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgVGhlIGlkZW50aWZpZXIgaXMgbmVjZXNzYXJ5LCBtYXliZSBpdCBzaG91bGQgYmUgdGhlIG5hbWUgb2YgdGhlIGVudGl0eSB3aGljaCBpcyBpbiB0aGUgTGlzdC5cclxuICAgICAgICAgICAgWW91ciBjb2RlIHNob3VsZCBsb29rIGxpa2UgbGV0IG15TGlzdFN0b3JlID0gbmV3IExpc3RTdG9yZSh7aWRlbnRpZmllcjogJ215RW50aXR5TGlzdCd9KSBvciBzb21ldGhpbmcgbGlrZSB0aGF0LlxyXG4gICAgICAgICAgIGBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBjb25mLmRlZmluaXRpb24gPSBERUZJTklUSU9OO1xyXG4gICAgICBzdXBlcihjb25mKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBMaXN0U3RvcmU7XHJcbiJdfQ==