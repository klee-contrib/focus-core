'use strict';

var _searchStore = require('../search-store');

var _searchStore2 = _interopRequireDefault(_searchStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LISTENED_NODES = ['query', 'scope', 'selectedFacets', 'groupingKey', 'sortBy', 'sortAsc'];

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var AdvancedSearchStore = function (_SearchStore) {
    _inherits(AdvancedSearchStore, _SearchStore);

    function AdvancedSearchStore(conf) {
        _classCallCheck(this, AdvancedSearchStore);

        conf = conf || {};
        conf.definition = {
            query: 'query',
            scope: 'scope',
            facets: 'facets',
            selectedFacets: 'selectedFacets',
            groupingKey: 'groupingKey',
            sortBy: 'sortBy',
            sortAsc: 'sortAsc',
            results: 'results',
            totalCount: 'totalCount'
        };
        conf.identifier = 'ADVANCED_SEARCH';
        return _possibleConstructorReturn(this, _SearchStore.call(this, conf));
    }

    AdvancedSearchStore.prototype.emitPendingEvents = function emitPendingEvents() {
        var _this2 = this;

        if (this.pendingEvents.find(function (ev) {
            return LISTENED_NODES.includes(ev.name.split(':change')[0]);
        })) {
            this.emit('advanced-search-criterias:change', { status: 'update' });
        }
        this.pendingEvents.map(function (evtToEmit) {
            var name = evtToEmit.name;
            var data = evtToEmit.data;

            _this2.emit(name, data);
        });
    };

    return AdvancedSearchStore;
}(_searchStore2.default);

module.exports = AdvancedSearchStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0saUJBQWlCLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsZ0JBQW5CLEVBQXFDLGFBQXJDLEVBQW9ELFFBQXBELEVBQThELFNBQTlELENBQXZCOztBQUVBOzs7OztJQUlNLG1COzs7QUFDRixpQ0FBWSxJQUFaLEVBQWlCO0FBQUE7O0FBQ2IsZUFBTyxRQUFRLEVBQWY7QUFDQSxhQUFLLFVBQUwsR0FBa0I7QUFDZCxtQkFBTyxPQURPO0FBRWQsbUJBQU8sT0FGTztBQUdkLG9CQUFRLFFBSE07QUFJZCw0QkFBZ0IsZ0JBSkY7QUFLZCx5QkFBYSxhQUxDO0FBTWQsb0JBQVEsUUFOTTtBQU9kLHFCQUFTLFNBUEs7QUFRZCxxQkFBUyxTQVJLO0FBU2Qsd0JBQVk7QUFURSxTQUFsQjtBQVdBLGFBQUssVUFBTCxHQUFrQixpQkFBbEI7QUFiYSxnREFjYix3QkFBTSxJQUFOLENBZGE7QUFlaEI7O2tDQUVELGlCLGdDQUFtQjtBQUFBOztBQUNmLFlBQUcsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCO0FBQUEsbUJBQU0sZUFBZSxRQUFmLENBQXdCLEdBQUcsSUFBSCxDQUFRLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLENBQXpCLENBQXhCLENBQU47QUFBQSxTQUF4QixDQUFILEVBQXdGO0FBQ3BGLGlCQUFLLElBQUwsQ0FBVSxrQ0FBVixFQUE4QyxFQUFDLFFBQVEsUUFBVCxFQUE5QztBQUNIO0FBQ0QsYUFBSyxhQUFMLENBQW1CLEdBQW5CLENBQXVCLFVBQUMsU0FBRCxFQUFhO0FBQUEsZ0JBQzNCLElBRDJCLEdBQ2IsU0FEYSxDQUMzQixJQUQyQjtBQUFBLGdCQUNyQixJQURxQixHQUNiLFNBRGEsQ0FDckIsSUFEcUI7O0FBRWhDLG1CQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWdCLElBQWhCO0FBQ0gsU0FIRDtBQUlILEs7Ozs7O0FBR0wsT0FBTyxPQUFQLEdBQWlCLG1CQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VhcmNoU3RvcmUgZnJvbSAnLi4vc2VhcmNoLXN0b3JlJztcclxuXHJcbmNvbnN0IExJU1RFTkVEX05PREVTID0gWydxdWVyeScsICdzY29wZScsICdzZWxlY3RlZEZhY2V0cycsICdncm91cGluZ0tleScsICdzb3J0QnknLCAnc29ydEFzYyddO1xyXG5cclxuLyoqXHJcbiogQ2xhc3Mgc3RhbmRpbmcgZm9yIGFsbCBhZHZhbmNlZCBzZWFyY2ggaW5mb3JtYXRpb24uXHJcbiogVGhlIHN0YXRlIHNob3VsZCBiZSB0aGUgY29tcGxldGUgc3RhdGUgb2YgdGhlIHBhZ2UuXHJcbiovXHJcbmNsYXNzIEFkdmFuY2VkU2VhcmNoU3RvcmUgZXh0ZW5kcyBTZWFyY2hTdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25mKXtcclxuICAgICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgICBjb25mLmRlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiAncXVlcnknLFxyXG4gICAgICAgICAgICBzY29wZTogJ3Njb3BlJyxcclxuICAgICAgICAgICAgZmFjZXRzOiAnZmFjZXRzJyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRGYWNldHM6ICdzZWxlY3RlZEZhY2V0cycsXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiAnZ3JvdXBpbmdLZXknLFxyXG4gICAgICAgICAgICBzb3J0Qnk6ICdzb3J0QnknLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiAnc29ydEFzYycsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6ICdyZXN1bHRzJyxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogJ3RvdGFsQ291bnQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25mLmlkZW50aWZpZXIgPSAnQURWQU5DRURfU0VBUkNIJztcclxuICAgICAgICBzdXBlcihjb25mKTtcclxuICAgIH1cclxuXHJcbiAgICBlbWl0UGVuZGluZ0V2ZW50cygpe1xyXG4gICAgICAgIGlmKHRoaXMucGVuZGluZ0V2ZW50cy5maW5kKGV2ID0+IExJU1RFTkVEX05PREVTLmluY2x1ZGVzKGV2Lm5hbWUuc3BsaXQoJzpjaGFuZ2UnKVswXSkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWR2YW5jZWQtc2VhcmNoLWNyaXRlcmlhczpjaGFuZ2UnLCB7c3RhdHVzOiAndXBkYXRlJ30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBlbmRpbmdFdmVudHMubWFwKChldnRUb0VtaXQpPT57XHJcbiAgICAgICAgICAgIGxldCB7bmFtZSwgZGF0YX0gPSBldnRUb0VtaXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChuYW1lLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBBZHZhbmNlZFNlYXJjaFN0b3JlO1xyXG4iXX0=