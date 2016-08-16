'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the reference store.
 */

var ReferenceStore = function (_CoreStore) {
  _inherits(ReferenceStore, _CoreStore);

  function ReferenceStore(conf) {
    _classCallCheck(this, ReferenceStore);

    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    return _possibleConstructorReturn(this, _CoreStore.call(this, conf));
  }

  ReferenceStore.prototype.getReference = function getReference(names) {
    var _this2 = this;

    var refs = {};
    names.map(function (name) {
      if (_this2.data.has(name)) {
        refs[name] = _this2.data.get(name);
      }
    });
    return { references: this.data.toJS() };
  };

  ReferenceStore.prototype.setReference = function setReference() {};

  return ReferenceStore;
}(CoreStore);

module.exports = ReferenceStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLFlBQVksUUFBUSxjQUFSLENBQWhCO0FBQ0EsSUFBSSxrQkFBa0IsUUFBUSxjQUFSLENBQXRCO0FBQ0E7Ozs7SUFHTSxjOzs7QUFHSiwwQkFBWSxJQUFaLEVBQWlCO0FBQUE7O0FBQ2YsV0FBTyxRQUFRLEVBQWY7QUFDQSxTQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLElBQW1CLGlCQUFyQztBQUZlLDRDQUdmLHNCQUFNLElBQU4sQ0FIZTtBQUloQjs7MkJBQ0QsWSx5QkFBYSxLLEVBQU07QUFBQTs7QUFDakIsUUFBSSxPQUFPLEVBQVg7QUFDQSxVQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBUTtBQUNoQixVQUFHLE9BQUssSUFBTCxDQUFVLEdBQVYsQ0FBYyxJQUFkLENBQUgsRUFBdUI7QUFDckIsYUFBSyxJQUFMLElBQWEsT0FBSyxJQUFMLENBQVUsR0FBVixDQUFjLElBQWQsQ0FBYjtBQUNEO0FBQ0YsS0FKRDtBQUtBLFdBQU8sRUFBQyxZQUFZLEtBQUssSUFBTCxDQUFVLElBQVYsRUFBYixFQUFQO0FBQ0QsRzs7MkJBQ0QsWSwyQkFBYyxDQUFFLEM7OztFQWpCVyxTOztBQXFCN0IsT0FBTyxPQUFQLEdBQWlCLGNBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG52YXIgQ29yZVN0b3JlID0gcmVxdWlyZSgnLi4vQ29yZVN0b3JlJyk7XHJcbnZhciBidWlsZERlZmluaXRpb24gPSByZXF1aXJlKCcuL2RlZmluaXRpb24nKTtcclxuLyoqXHJcbiAqIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgcmVmZXJlbmNlIHN0b3JlLlxyXG4gKi9cclxuY2xhc3MgUmVmZXJlbmNlU3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoY29uZil7XHJcbiAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgIGNvbmYuZGVmaW5pdGlvbiA9IGNvbmYuZGVmaW5pdGlvbiB8fCBidWlsZERlZmluaXRpb24oKTtcclxuICAgIHN1cGVyKGNvbmYpO1xyXG4gIH1cclxuICBnZXRSZWZlcmVuY2UobmFtZXMpe1xyXG4gICAgdmFyIHJlZnMgPSB7fTtcclxuICAgIG5hbWVzLm1hcCgobmFtZSk9PntcclxuICAgICAgaWYodGhpcy5kYXRhLmhhcyhuYW1lKSl7XHJcbiAgICAgICAgcmVmc1tuYW1lXSA9IHRoaXMuZGF0YS5nZXQobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtyZWZlcmVuY2VzOiB0aGlzLmRhdGEudG9KUygpfTtcclxuICB9XHJcbiAgc2V0UmVmZXJlbmNlKCl7fVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWZlcmVuY2VTdG9yZTtcclxuIl19