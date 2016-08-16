'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SearchStore = require('../search-store');

var LISTENED_NODES = ['query', 'scope'];

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var QuickSearchStore = function (_SearchStore) {
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
        conf.identifier = conf.identifier || 'QUICK_SEARCH';
        return _possibleConstructorReturn(this, _SearchStore.call(this, conf));
    }

    QuickSearchStore.prototype.emitPendingEvents = function emitPendingEvents() {
        var _this2 = this;

        if (this.pendingEvents.find(function (ev) {
            return LISTENED_NODES.includes(ev.name.split(':change')[0]);
        })) {
            this.emit('quick-search-criterias:change', { status: 'update' });
        }
        this.pendingEvents.map(function (evtToEmit) {
            var name = evtToEmit.name;
            var data = evtToEmit.data;

            _this2.emit(name, data);
        });
    };

    return QuickSearchStore;
}(SearchStore);

module.exports = QuickSearchStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxjQUFjLFFBQVEsaUJBQVIsQ0FBbEI7O0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxPQUFELEVBQVUsT0FBVixDQUF2Qjs7QUFFQTs7Ozs7SUFJTSxnQjs7O0FBQ0YsOEJBQVksSUFBWixFQUFpQjtBQUFBOztBQUNiLGVBQU8sUUFBUSxFQUFmO0FBQ0EsYUFBSyxVQUFMLEdBQWtCO0FBQ2QsbUJBQU8sT0FETztBQUVkLG1CQUFPLE9BRk87QUFHZCxxQkFBUyxTQUhLO0FBSWQsb0JBQVEsUUFKTTtBQUtkLHdCQUFZO0FBTEUsU0FBbEI7QUFPQSxhQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLElBQW1CLGNBQXJDO0FBVGEsZ0RBVWIsd0JBQU0sSUFBTixDQVZhO0FBV2hCOzsrQkFFRCxpQixnQ0FBbUI7QUFBQTs7QUFDZixZQUFHLEtBQUssYUFBTCxDQUFtQixJQUFuQixDQUF3QjtBQUFBLG1CQUFNLGVBQWUsUUFBZixDQUF3QixHQUFHLElBQUgsQ0FBUSxLQUFSLENBQWMsU0FBZCxFQUF5QixDQUF6QixDQUF4QixDQUFOO0FBQUEsU0FBeEIsQ0FBSCxFQUF3RjtBQUNwRixpQkFBSyxJQUFMLENBQVUsK0JBQVYsRUFBMkMsRUFBQyxRQUFRLFFBQVQsRUFBM0M7QUFDSDtBQUNELGFBQUssYUFBTCxDQUFtQixHQUFuQixDQUF1QixVQUFDLFNBQUQsRUFBYTtBQUFBLGdCQUMzQixJQUQyQixHQUNiLFNBRGEsQ0FDM0IsSUFEMkI7QUFBQSxnQkFDckIsSUFEcUIsR0FDYixTQURhLENBQ3JCLElBRHFCOztBQUVoQyxtQkFBSyxJQUFMLENBQVUsSUFBVixFQUFnQixJQUFoQjtBQUNILFNBSEQ7QUFJSCxLOzs7RUF0QjBCLFc7O0FBeUIvQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBTZWFyY2hTdG9yZSA9IHJlcXVpcmUoJy4uL3NlYXJjaC1zdG9yZScpO1xyXG5cclxuY29uc3QgTElTVEVORURfTk9ERVMgPSBbJ3F1ZXJ5JywgJ3Njb3BlJ107XHJcblxyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgYWxsIGFkdmFuY2VkIHNlYXJjaCBpbmZvcm1hdGlvbi5cclxuKiBUaGUgc3RhdGUgc2hvdWxkIGJlIHRoZSBjb21wbGV0ZSBzdGF0ZSBvZiB0aGUgcGFnZS5cclxuKi9cclxuY2xhc3MgUXVpY2tTZWFyY2hTdG9yZSBleHRlbmRzIFNlYXJjaFN0b3Jle1xyXG4gICAgY29uc3RydWN0b3IoY29uZil7XHJcbiAgICAgICAgY29uZiA9IGNvbmYgfHwge307XHJcbiAgICAgICAgY29uZi5kZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgICBxdWVyeTogJ3F1ZXJ5JyxcclxuICAgICAgICAgICAgc2NvcGU6ICdzY29wZScsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6ICdyZXN1bHRzJyxcclxuICAgICAgICAgICAgZmFjZXRzOiAnZmFjZXRzJyxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogJ3RvdGFsQ291bnQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25mLmlkZW50aWZpZXIgPSBjb25mLmlkZW50aWZpZXIgfHwgJ1FVSUNLX1NFQVJDSCc7XHJcbiAgICAgICAgc3VwZXIoY29uZik7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdFBlbmRpbmdFdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLnBlbmRpbmdFdmVudHMuZmluZChldiA9PiBMSVNURU5FRF9OT0RFUy5pbmNsdWRlcyhldi5uYW1lLnNwbGl0KCc6Y2hhbmdlJylbMF0pKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3F1aWNrLXNlYXJjaC1jcml0ZXJpYXM6Y2hhbmdlJywge3N0YXR1czogJ3VwZGF0ZSd9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzLm1hcCgoZXZ0VG9FbWl0KT0+e1xyXG4gICAgICAgICAgICBsZXQge25hbWUsIGRhdGF9ID0gZXZ0VG9FbWl0O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gUXVpY2tTZWFyY2hTdG9yZTtcclxuIl19