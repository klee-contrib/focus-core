'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Dependencies.
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var Immutable = require('immutable');
/**
 * Class standing for the cartridge store.
 */

var ApplicationStore = function (_CoreStore) {
  _inherits(ApplicationStore, _CoreStore);

  function ApplicationStore(conf) {
    _classCallCheck(this, ApplicationStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    return _possibleConstructorReturn(this, _CoreStore.call(this, conf));
  }
  /**
   * Update the mode value.
   * @param  {object} dataNode - The value of the data.
   */


  ApplicationStore.prototype.updateMode = function updateMode(dataNode) {
    var modeData = this.data.has('mode') ? this.data.get('mode') : Immutable.fromJS({});
    var newModeValue = modeData.has(dataNode.newMode) ? modeData.get(dataNode.newMode) + 1 : 1;
    //Add a check to not have a negative mode, but it should not happen.
    var previousModeValue = modeData.has(dataNode.previousMode) ? modeData.get(dataNode.previousMode) - 1 : 0;
    this.data = this.data.set('mode', modeData.set(dataNode.newMode, newModeValue).set(dataNode.previousMode, previousModeValue));
    this.willEmit('mode:change');
  };

  return ApplicationStore;
}(CoreStore);

module.exports = ApplicationStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLFlBQVksUUFBUSxjQUFSLENBQWhCO0FBQ0EsSUFBSSxnQkFBZ0IsUUFBUSxjQUFSLENBQXBCO0FBQ0EsSUFBSSxZQUFZLFFBQVEsV0FBUixDQUFoQjtBQUNBOzs7O0lBR00sZ0I7OztBQUNKLDRCQUFZLElBQVosRUFBaUI7QUFBQTs7QUFDZixXQUFPLFFBQVEsRUFBZjtBQUNBLFNBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsSUFBbUIsZUFBckM7QUFGZSw0Q0FHZixzQkFBTSxJQUFOLENBSGU7QUFJaEI7QUFDRDs7Ozs7OzZCQUlBLFUsdUJBQVcsUSxFQUFTO0FBQ2xCLFFBQUksV0FBVyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsTUFBZCxJQUF3QixLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsTUFBZCxDQUF4QixHQUFnRCxVQUFVLE1BQVYsQ0FBaUIsRUFBakIsQ0FBL0Q7QUFDQSxRQUFJLGVBQWdCLFNBQVMsR0FBVCxDQUFhLFNBQVMsT0FBdEIsSUFBaUMsU0FBUyxHQUFULENBQWEsU0FBUyxPQUF0QixJQUFpQyxDQUFsRSxHQUF1RSxDQUEzRjtBQUNBO0FBQ0EsUUFBSSxvQkFBcUIsU0FBUyxHQUFULENBQWEsU0FBUyxZQUF0QixJQUFzQyxTQUFTLEdBQVQsQ0FBYSxTQUFTLFlBQXRCLElBQXNDLENBQTVFLEdBQWlGLENBQTFHO0FBQ0EsU0FBSyxJQUFMLEdBQVksS0FBSyxJQUFMLENBQVUsR0FBVixDQUFjLE1BQWQsRUFDVixTQUFTLEdBQVQsQ0FBYSxTQUFTLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEdBQTdDLENBQWlELFNBQVMsWUFBMUQsRUFBd0UsaUJBQXhFLENBRFUsQ0FBWjtBQUdBLFNBQUssUUFBTCxDQUFjLGFBQWQ7QUFDRCxHOzs7RUFuQjRCLFM7O0FBc0IvQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG52YXIgQ29yZVN0b3JlID0gcmVxdWlyZSgnLi4vQ29yZVN0b3JlJyk7XHJcbnZhciBnZXREZWZpbml0aW9uID0gcmVxdWlyZSgnLi9kZWZpbml0aW9uJyk7XHJcbnZhciBJbW11dGFibGUgPSByZXF1aXJlKCdpbW11dGFibGUnKTtcclxuLyoqXHJcbiAqIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgY2FydHJpZGdlIHN0b3JlLlxyXG4gKi9cclxuY2xhc3MgQXBwbGljYXRpb25TdG9yZSBleHRlbmRzIENvcmVTdG9yZSB7XHJcbiAgY29uc3RydWN0b3IoY29uZil7XHJcbiAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgIGNvbmYuZGVmaW5pdGlvbiA9IGNvbmYuZGVmaW5pdGlvbiB8fCBnZXREZWZpbml0aW9uKCk7XHJcbiAgICBzdXBlcihjb25mKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBtb2RlIHZhbHVlLlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZGF0YU5vZGUgLSBUaGUgdmFsdWUgb2YgdGhlIGRhdGEuXHJcbiAgICovXHJcbiAgdXBkYXRlTW9kZShkYXRhTm9kZSl7XHJcbiAgICB2YXIgbW9kZURhdGEgPSB0aGlzLmRhdGEuaGFzKCdtb2RlJykgPyB0aGlzLmRhdGEuZ2V0KCdtb2RlJykgOiBJbW11dGFibGUuZnJvbUpTKHt9KTtcclxuICAgIHZhciBuZXdNb2RlVmFsdWUgID0gbW9kZURhdGEuaGFzKGRhdGFOb2RlLm5ld01vZGUpPyAobW9kZURhdGEuZ2V0KGRhdGFOb2RlLm5ld01vZGUpICsgMSkgOiAxO1xyXG4gICAgLy9BZGQgYSBjaGVjayB0byBub3QgaGF2ZSBhIG5lZ2F0aXZlIG1vZGUsIGJ1dCBpdCBzaG91bGQgbm90IGhhcHBlbi5cclxuICAgIHZhciBwcmV2aW91c01vZGVWYWx1ZSA9ICBtb2RlRGF0YS5oYXMoZGF0YU5vZGUucHJldmlvdXNNb2RlKT8gKG1vZGVEYXRhLmdldChkYXRhTm9kZS5wcmV2aW91c01vZGUpIC0gMSkgOiAwO1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnNldCgnbW9kZScsXHJcbiAgICAgIG1vZGVEYXRhLnNldChkYXRhTm9kZS5uZXdNb2RlLCBuZXdNb2RlVmFsdWUpLnNldChkYXRhTm9kZS5wcmV2aW91c01vZGUsIHByZXZpb3VzTW9kZVZhbHVlKVxyXG4gICAgKTtcclxuICAgIHRoaXMud2lsbEVtaXQoJ21vZGU6Y2hhbmdlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uU3RvcmU7XHJcbiJdfQ==