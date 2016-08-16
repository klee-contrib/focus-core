'use strict';

var dispatcher = require('../dispatcher');
var loadAction = require('./load-action');
var NB_LIST_ELEMENT = 50;

/**
 * Builded search action.
 * @param  {object} options - The options used to build the service, it should have the following structure:
 * ```javascript
 * {
 *   identifier: string: should be 'ADVANCED_SEARCH' or 'QUICK_SEARCH'
 * 	service:{
 * 		scoped: "function which launch the scope search"
 * 		unScoped: "function whoch launch the unscoped search"
 * 	}
 * 	getSearchOptions a function which get the associated search store value
 * 	nbSearchElement: number of elements to request on each search.
 * }
 * ```
 * @return {function} - The builded search action.
 */
module.exports = function (config) {
  config = config || {};
  if (!config.identifier) {
    console.warn('Your action should have an identifier');
  }
  if (!config.service) {
    console.warn('Your action should have a service');
  }
  if (!config.getListOptions) {
    console.warn('Your action should have a search options getter.');
  }
  if (!config.nbSearchElement) {
    config.nbElement = NB_LIST_ELEMENT;
  }
  return {
    /**
     * Build the search for the identifier scope.
     * @return {function} The search function for the given identifier.
     */
    load: loadAction(config),
    /**
     * Update the query for the identifier scope.
     * @param  {string} value - The query value
     * @return {function} The update query function for the given identifier.
     */
    updateProperties: function updateProperties(value) {
      return dispatcher.handleViewAction({
        data: value,
        type: 'update',
        identifier: config.identifier
      });
    }
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksYUFBYSxRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsUUFBUSxlQUFSLENBQWpCO0FBQ0EsSUFBTSxrQkFBa0IsRUFBeEI7O0FBRUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsT0FBTyxPQUFQLEdBQWlCLFVBQVMsTUFBVCxFQUFnQjtBQUMvQixXQUFTLFVBQVUsRUFBbkI7QUFDQSxNQUFHLENBQUMsT0FBTyxVQUFYLEVBQXNCO0FBQ3BCLFlBQVEsSUFBUixDQUFhLHVDQUFiO0FBQ0Q7QUFDRCxNQUFHLENBQUMsT0FBTyxPQUFYLEVBQW1CO0FBQ2pCLFlBQVEsSUFBUixDQUFhLG1DQUFiO0FBQ0Q7QUFDRCxNQUFHLENBQUMsT0FBTyxjQUFYLEVBQTBCO0FBQ3hCLFlBQVEsSUFBUixDQUFhLGtEQUFiO0FBQ0Q7QUFDRCxNQUFHLENBQUMsT0FBTyxlQUFYLEVBQTJCO0FBQ3pCLFdBQU8sU0FBUCxHQUFtQixlQUFuQjtBQUNEO0FBQ0QsU0FBTztBQUNMOzs7O0FBSUEsVUFBTSxXQUFXLE1BQVgsQ0FMRDtBQU1MOzs7OztBQUtBLG9CQVhLLDRCQVdZLEtBWFosRUFXa0I7QUFDckIsYUFBTyxXQUFXLGdCQUFYLENBQTRCO0FBQ2pDLGNBQU0sS0FEMkI7QUFFakMsY0FBTSxRQUYyQjtBQUdqQyxvQkFBWSxPQUFPO0FBSGMsT0FBNUIsQ0FBUDtBQUtEO0FBakJJLEdBQVA7QUFtQkQsQ0FqQ0QiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XHJcbmxldCBsb2FkQWN0aW9uID0gcmVxdWlyZSgnLi9sb2FkLWFjdGlvbicpO1xyXG5jb25zdCBOQl9MSVNUX0VMRU1FTlQgPSA1MDtcclxuXHJcbiAvKipcclxuICAqIEJ1aWxkZWQgc2VhcmNoIGFjdGlvbi5cclxuICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHVzZWQgdG8gYnVpbGQgdGhlIHNlcnZpY2UsIGl0IHNob3VsZCBoYXZlIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gICogYGBgamF2YXNjcmlwdFxyXG4gICoge1xyXG4gICogICBpZGVudGlmaWVyOiBzdHJpbmc6IHNob3VsZCBiZSAnQURWQU5DRURfU0VBUkNIJyBvciAnUVVJQ0tfU0VBUkNIJ1xyXG4gICogXHRzZXJ2aWNlOntcclxuICAqIFx0XHRzY29wZWQ6IFwiZnVuY3Rpb24gd2hpY2ggbGF1bmNoIHRoZSBzY29wZSBzZWFyY2hcIlxyXG4gICogXHRcdHVuU2NvcGVkOiBcImZ1bmN0aW9uIHdob2NoIGxhdW5jaCB0aGUgdW5zY29wZWQgc2VhcmNoXCJcclxuICAqIFx0fVxyXG4gICogXHRnZXRTZWFyY2hPcHRpb25zIGEgZnVuY3Rpb24gd2hpY2ggZ2V0IHRoZSBhc3NvY2lhdGVkIHNlYXJjaCBzdG9yZSB2YWx1ZVxyXG4gICogXHRuYlNlYXJjaEVsZW1lbnQ6IG51bWJlciBvZiBlbGVtZW50cyB0byByZXF1ZXN0IG9uIGVhY2ggc2VhcmNoLlxyXG4gICogfVxyXG4gICogYGBgXHJcbiAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgYnVpbGRlZCBzZWFyY2ggYWN0aW9uLlxyXG4gICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29uZmlnKXtcclxuICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgaWYoIWNvbmZpZy5pZGVudGlmaWVyKXtcclxuICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYW4gaWRlbnRpZmllcicpO1xyXG4gIH1cclxuICBpZighY29uZmlnLnNlcnZpY2Upe1xyXG4gICAgY29uc29sZS53YXJuKCdZb3VyIGFjdGlvbiBzaG91bGQgaGF2ZSBhIHNlcnZpY2UnKTtcclxuICB9XHJcbiAgaWYoIWNvbmZpZy5nZXRMaXN0T3B0aW9ucyl7XHJcbiAgICBjb25zb2xlLndhcm4oJ1lvdXIgYWN0aW9uIHNob3VsZCBoYXZlIGEgc2VhcmNoIG9wdGlvbnMgZ2V0dGVyLicpO1xyXG4gIH1cclxuICBpZighY29uZmlnLm5iU2VhcmNoRWxlbWVudCl7XHJcbiAgICBjb25maWcubmJFbGVtZW50ID0gTkJfTElTVF9FTEVNRU5UO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZCB0aGUgc2VhcmNoIGZvciB0aGUgaWRlbnRpZmllciBzY29wZS5cclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgc2VhcmNoIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cclxuICAgICAqL1xyXG4gICAgbG9hZDogbG9hZEFjdGlvbihjb25maWcpLFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHF1ZXJ5IGZvciB0aGUgaWRlbnRpZmllciBzY29wZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgLSBUaGUgcXVlcnkgdmFsdWVcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgdXBkYXRlIHF1ZXJ5IGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHJvcGVydGllcyh2YWx1ZSl7XHJcbiAgICAgIHJldHVybiBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICAgIGRhdGE6IHZhbHVlLFxyXG4gICAgICAgIHR5cGU6ICd1cGRhdGUnLFxyXG4gICAgICAgIGlkZW50aWZpZXI6IGNvbmZpZy5pZGVudGlmaWVyXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiJdfQ==