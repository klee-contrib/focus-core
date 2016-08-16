'use strict';

var merge = require('lodash/object/merge');

var _require = require('lodash/lang');

var isObject = _require.isObject;
var clone = _require.clone;

/**
 * Configuration object.
 * @type {{CORS: boolean}}
 */

var configuration = {
  CORS: true,
  xhrErrors: {}
};

/**
 * Function which overrides the configuration.
 * @param conf
 */
function configure(conf) {
  if (isObject(conf)) {
    merge(configuration, conf);
  }
}

module.exports = {
  configure: configure,
  get: function get() {
    return clone(configuration);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksUUFBUSxRQUFRLHFCQUFSLENBQVo7O2VBQ3dCLFFBQVEsYUFBUixDOztJQUFuQixRLFlBQUEsUTtJQUFVLEssWUFBQSxLOztBQUVmOzs7OztBQUlBLElBQUksZ0JBQWdCO0FBQ2xCLFFBQU0sSUFEWTtBQUVsQixhQUFXO0FBRk8sQ0FBcEI7O0FBS0E7Ozs7QUFJQSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBd0I7QUFDdEIsTUFBRyxTQUFTLElBQVQsQ0FBSCxFQUFrQjtBQUNoQixVQUFNLGFBQU4sRUFBcUIsSUFBckI7QUFDRDtBQUVGOztBQUdELE9BQU8sT0FBUCxHQUFpQjtBQUNmLGFBQVcsU0FESTtBQUVmLEtBRmUsaUJBRVY7QUFDSCxXQUFPLE1BQU0sYUFBTixDQUFQO0FBQ0Q7QUFKYyxDQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyk7XHJcbmxldCB7aXNPYmplY3QsIGNsb25lfSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBvYmplY3QuXHJcbiAqIEB0eXBlIHt7Q09SUzogYm9vbGVhbn19XHJcbiAqL1xyXG5sZXQgY29uZmlndXJhdGlvbiA9IHtcclxuICBDT1JTOiB0cnVlLFxyXG4gIHhockVycm9yczoge31cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB3aGljaCBvdmVycmlkZXMgdGhlIGNvbmZpZ3VyYXRpb24uXHJcbiAqIEBwYXJhbSBjb25mXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25maWd1cmUoY29uZil7XHJcbiAgaWYoaXNPYmplY3QoY29uZikpe1xyXG4gICAgbWVyZ2UoY29uZmlndXJhdGlvbiwgY29uZik7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGNvbmZpZ3VyZTogY29uZmlndXJlLFxyXG4gIGdldCgpe1xyXG4gICAgcmV0dXJuIGNsb25lKGNvbmZpZ3VyYXRpb24pO1xyXG4gIH1cclxufTtcclxuIl19