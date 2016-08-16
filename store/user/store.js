'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the user store.
 */

var UserStore = function (_CoreStore) {
  _inherits(UserStore, _CoreStore);

  function UserStore(conf) {
    _classCallCheck(this, UserStore);

    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    return _possibleConstructorReturn(this, _CoreStore.call(this, conf));
  }

  return UserStore;
}(CoreStore);

module.exports = UserStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLFlBQVksUUFBUSxjQUFSLENBQWhCO0FBQ0EsSUFBSSxrQkFBa0IsUUFBUSxjQUFSLENBQXRCO0FBQ0E7Ozs7SUFHTSxTOzs7QUFDSixxQkFBWSxJQUFaLEVBQWlCO0FBQUE7O0FBQ2YsV0FBTyxRQUFRLEVBQWY7QUFDQSxTQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLElBQW1CLGlCQUFyQztBQUZlLDRDQUdmLHNCQUFNLElBQU4sQ0FIZTtBQUloQjs7O0VBTHFCLFM7O0FBU3hCLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxudmFyIENvcmVTdG9yZSA9IHJlcXVpcmUoJy4uL0NvcmVTdG9yZScpO1xyXG52YXIgYnVpbGREZWZpbml0aW9uID0gcmVxdWlyZSgnLi9kZWZpbml0aW9uJyk7XHJcbi8qKlxyXG4gKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIHVzZXIgc3RvcmUuXHJcbiAqL1xyXG5jbGFzcyBVc2VyU3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmYpe1xyXG4gICAgY29uZiA9IGNvbmYgfHwge307XHJcbiAgICBjb25mLmRlZmluaXRpb24gPSBjb25mLmRlZmluaXRpb24gfHwgYnVpbGREZWZpbml0aW9uKCk7XHJcbiAgICBzdXBlcihjb25mKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJTdG9yZTtcclxuIl19