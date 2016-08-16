'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Dependencies.
var Immutable = require('immutable');
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var uuid = require('uuid').v4;
var CLEAR = 'clear';
var UPDATE = 'update';
var AppDispatcher = require('../../dispatcher');

/**
 * Class standing for the cartridge store.
 */

var RequestStore = function (_CoreStore) {
  _inherits(RequestStore, _CoreStore);

  /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the request store.
   */
  function RequestStore(conf) {
    _classCallCheck(this, RequestStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();

    var _this = _possibleConstructorReturn(this, _CoreStore.call(this, conf));

    _this.pending = Immutable.Map({});
    _this.success = Immutable.Map({});
    _this.error = Immutable.Map({});
    _this.cancelled = Immutable.Map({});
    return _this;
  }
  /**
   * Get a message from its identifier.
   * @param {string} messageId - The message identifier.
   * @returns {object} - The requested message.
   */


  RequestStore.prototype.getRequest = function getRequest(requestId) {
    if (!this.data.has(requestId)) {
      return undefined;
    }
    return this.data.get(requestId);
  };
  /**
   * Get the requests by type
   * @return {object} An object with the total of request by type.
   */


  RequestStore.prototype.getRequests = function getRequests() {
    return {
      'pending': this.pending.size,
      'cancelled': this.cancelled.size,
      'success': this.success.size,
      'error': this.error.size,
      'total': this.pending.size + this.cancelled.size + this.success.size + this.error.size
    };
  };
  /**
   * Add a listener on the global change on the search store.
   * @param {object} message - The message to add.
   */


  RequestStore.prototype.updateRequest = function updateRequest(request) {
    request.id = request.id || '' + uuid();
    //If the status is supported
    if (this.definition[request.status]) {
      //Update the associated collection
      this[request.status] = this[request.status].set(request.id, request);
      //Remove the associated request from pending
      if (request.status !== 'pending' && this.pending.has(request.id)) {
        this.pending = this.pending.delete(request.id);
      }
    }
    this.emit(UPDATE, request.id);
  };
  /**
   * Clear all messages in the stack.
   */


  RequestStore.prototype.clearRequests = function clearRequests() {
    this.data = this.data.clear();
    this.emit(CLEAR);
  };
  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */


  RequestStore.prototype.addUpdateRequestListener = function addUpdateRequestListener(cb) {
    this.addListener(UPDATE, cb);
  };
  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */


  RequestStore.prototype.removeUpdateRequestListener = function removeUpdateRequestListener(cb) {
    this.removeListener(UPDATE, cb);
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */


  RequestStore.prototype.addClearRequestsListener = function addClearRequestsListener(cb) {
    this.addListener(CLEAR, cb);
  };
  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */


  RequestStore.prototype.removeClearRequestsListener = function removeClearRequestsListener(cb) {
    this.removeListener(CLEAR, cb);
  };

  RequestStore.prototype.registerDispatcher = function registerDispatcher() {
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function (transferInfo) {
      var rawData = transferInfo.action.data;
      var type = transferInfo.action.type;
      if (!rawData || !rawData.request) {
        return;
      }
      switch (type) {
        case 'update':
          if (rawData.request) {
            currentStore.updateRequest(rawData.request);
          }
          break;
        case 'clear':
          if (rawData.request) {
            currentStore.clearRequests();
          }
          break;
      }
    });
  };

  return RequestStore;
}(CoreStore);

module.exports = RequestStore;
//# sourceMappingURL=data:application/json;base64,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MUIsU0FBSyxXQUFMLENBQWlCLEtBQWpCLEVBQXdCLEVBQXhCO0FBQ0QsRztBQUNEOzs7Ozs7eUJBSUEsMkIsd0NBQTRCLEUsRUFBRztBQUM3QixTQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsRUFBM0I7QUFDRCxHOzt5QkFDRCxrQixpQ0FBb0I7QUFDbEIsUUFBSSxlQUFlLElBQW5CO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLGNBQWMsUUFBZCxDQUF1QixVQUFTLFlBQVQsRUFBdUI7QUFDNUQsVUFBSSxVQUFVLGFBQWEsTUFBYixDQUFvQixJQUFsQztBQUNBLFVBQUksT0FBTyxhQUFhLE1BQWIsQ0FBb0IsSUFBL0I7QUFDQSxVQUFHLENBQUMsT0FBRCxJQUFZLENBQUMsUUFBUSxPQUF4QixFQUFnQztBQUFDO0FBQVE7QUFDekMsY0FBUSxJQUFSO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsY0FBRyxRQUFRLE9BQVgsRUFBbUI7QUFDakIseUJBQWEsYUFBYixDQUEyQixRQUFRLE9BQW5DO0FBQ0Q7QUFDRDtBQUNGLGFBQUssT0FBTDtBQUNFLGNBQUcsUUFBUSxPQUFYLEVBQW1CO0FBQ2pCLHlCQUFhLGFBQWI7QUFDRDtBQUNEO0FBVko7QUFZRCxLQWhCZSxDQUFoQjtBQWlCRCxHOzs7RUE5R3dCLFM7O0FBaUgzQixPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9EZXBlbmRlbmNpZXMuXHJcbnZhciBJbW11dGFibGUgPSByZXF1aXJlKCdpbW11dGFibGUnKTtcclxudmFyIENvcmVTdG9yZSA9IHJlcXVpcmUoJy4uL0NvcmVTdG9yZScpO1xyXG52YXIgZ2V0RGVmaW5pdGlvbiA9IHJlcXVpcmUoJy4vZGVmaW5pdGlvbicpO1xyXG52YXIgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKS52NDtcclxuY29uc3QgQ0xFQVIgPSAnY2xlYXInO1xyXG5jb25zdCBVUERBVEUgPSAndXBkYXRlJztcclxudmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi8uLi9kaXNwYXRjaGVyJyk7XHJcblxyXG4vKipcclxuICogQ2xhc3Mgc3RhbmRpbmcgZm9yIHRoZSBjYXJ0cmlkZ2Ugc3RvcmUuXHJcbiAqL1xyXG5jbGFzcyBSZXF1ZXN0U3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmYgLSBUaGUgY29uZmlndXJhdGlvbiBvZiB0aGUgcmVxdWVzdCBzdG9yZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb25mKXtcclxuICAgIGNvbmYgPSBjb25mIHx8IHt9O1xyXG4gICAgY29uZi5kZWZpbml0aW9uID0gY29uZi5kZWZpbml0aW9uIHx8IGdldERlZmluaXRpb24oKTtcclxuICAgIHN1cGVyKGNvbmYpO1xyXG4gICAgdGhpcy5wZW5kaW5nID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICB0aGlzLnN1Y2Nlc3MgPSBJbW11dGFibGUuTWFwKHt9KTtcclxuICAgIHRoaXMuZXJyb3IgPSBJbW11dGFibGUuTWFwKHt9KTtcclxuICAgIHRoaXMuY2FuY2VsbGVkID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEdldCBhIG1lc3NhZ2UgZnJvbSBpdHMgaWRlbnRpZmllci5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZUlkIC0gVGhlIG1lc3NhZ2UgaWRlbnRpZmllci5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSByZXF1ZXN0ZWQgbWVzc2FnZS5cclxuICAgKi9cclxuICBnZXRSZXF1ZXN0KHJlcXVlc3RJZCl7XHJcbiAgICBpZighdGhpcy5kYXRhLmhhcyhyZXF1ZXN0SWQpKXtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KHJlcXVlc3RJZCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcmVxdWVzdHMgYnkgdHlwZVxyXG4gICAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IHdpdGggdGhlIHRvdGFsIG9mIHJlcXVlc3QgYnkgdHlwZS5cclxuICAgKi9cclxuICBnZXRSZXF1ZXN0cygpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ3BlbmRpbmcnOiB0aGlzLnBlbmRpbmcuc2l6ZSxcclxuICAgICAgJ2NhbmNlbGxlZCc6IHRoaXMuY2FuY2VsbGVkLnNpemUsXHJcbiAgICAgICdzdWNjZXNzJzogdGhpcy5zdWNjZXNzLnNpemUsXHJcbiAgICAgICdlcnJvcic6IHRoaXMuZXJyb3Iuc2l6ZSxcclxuICAgICAgJ3RvdGFsJzogdGhpcy5wZW5kaW5nLnNpemUgKyB0aGlzLmNhbmNlbGxlZC5zaXplICsgdGhpcy5zdWNjZXNzLnNpemUgKyB0aGlzLmVycm9yLnNpemVcclxuICAgIH07XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBhZGQuXHJcbiAgICovXHJcbiAgdXBkYXRlUmVxdWVzdChyZXF1ZXN0KXtcclxuICAgIHJlcXVlc3QuaWQgPSByZXF1ZXN0LmlkIHx8IGAke3V1aWQoKX1gO1xyXG4gICAgLy9JZiB0aGUgc3RhdHVzIGlzIHN1cHBvcnRlZFxyXG4gICAgaWYodGhpcy5kZWZpbml0aW9uW3JlcXVlc3Quc3RhdHVzXSl7XHJcbiAgICAgIC8vVXBkYXRlIHRoZSBhc3NvY2lhdGVkIGNvbGxlY3Rpb25cclxuICAgICAgdGhpc1tyZXF1ZXN0LnN0YXR1c10gPSB0aGlzW3JlcXVlc3Quc3RhdHVzXS5zZXQocmVxdWVzdC5pZCwgcmVxdWVzdCk7XHJcbiAgICAgIC8vUmVtb3ZlIHRoZSBhc3NvY2lhdGVkIHJlcXVlc3QgZnJvbSBwZW5kaW5nXHJcbiAgICAgIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAncGVuZGluZycgJiYgdGhpcy5wZW5kaW5nLmhhcyhyZXF1ZXN0LmlkKSl7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5wZW5kaW5nLmRlbGV0ZShyZXF1ZXN0LmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0KFVQREFURSwgcmVxdWVzdC5pZCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGFsbCBtZXNzYWdlcyBpbiB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgY2xlYXJSZXF1ZXN0cygpe1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmNsZWFyKCk7XHJcbiAgICB0aGlzLmVtaXQoQ0xFQVIpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gIGFkZFVwZGF0ZVJlcXVlc3RMaXN0ZW5lcihjYil7XHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKFVQREFURSwgY2IpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGxlZCB3aGVuIGEgbWVzc2FnZSBpcyBwdXNoZWQuXHJcbiAgICovXHJcbiAgcmVtb3ZlVXBkYXRlUmVxdWVzdExpc3RlbmVyKGNiKXtcclxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoVVBEQVRFLCBjYik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gIGFkZENsZWFyUmVxdWVzdHNMaXN0ZW5lcihjYil7XHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKENMRUFSLCBjYik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgdG8gY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICByZW1vdmVDbGVhclJlcXVlc3RzTGlzdGVuZXIoY2Ipe1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihDTEVBUiwgY2IpO1xyXG4gIH1cclxuICByZWdpc3RlckRpc3BhdGNoZXIoKXtcclxuICAgIHZhciBjdXJyZW50U3RvcmUgPSB0aGlzO1xyXG4gICAgdGhpcy5kaXNwYXRjaCA9IEFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24odHJhbnNmZXJJbmZvKSB7XHJcbiAgICAgIHZhciByYXdEYXRhID0gdHJhbnNmZXJJbmZvLmFjdGlvbi5kYXRhO1xyXG4gICAgICB2YXIgdHlwZSA9IHRyYW5zZmVySW5mby5hY3Rpb24udHlwZTtcclxuICAgICAgaWYoIXJhd0RhdGEgfHwgIXJhd0RhdGEucmVxdWVzdCl7cmV0dXJuO31cclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAndXBkYXRlJzpcclxuICAgICAgICAgIGlmKHJhd0RhdGEucmVxdWVzdCl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZS51cGRhdGVSZXF1ZXN0KHJhd0RhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhcic6XHJcbiAgICAgICAgICBpZihyYXdEYXRhLnJlcXVlc3Qpe1xyXG4gICAgICAgICAgICBjdXJyZW50U3RvcmUuY2xlYXJSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0U3RvcmU7XHJcbiJdfQ==