'use strict';

var dispatcher = require('../dispatcher');
var searchAction = require('./search-action');
var NB_SEARCH_ELEMENT = 50;

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
  if (!config.getSearchOptions) {
    console.warn('Your action should have a search options getter.');
  }
  if (!config.nbSearchElement) {
    config.nbSearchElement = NB_SEARCH_ELEMENT;
  }
  return {
    /**
     * Build the search for the identifier scope.
     * @return {function} The search function for the given identifier.
     */
    search: searchAction(config),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksYUFBYSxRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFJLGVBQWUsUUFBUSxpQkFBUixDQUFuQjtBQUNBLElBQU0sb0JBQW9CLEVBQTFCOztBQUVDOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELE9BQU8sT0FBUCxHQUFpQixVQUFTLE1BQVQsRUFBZ0I7QUFDL0IsV0FBUyxVQUFVLEVBQW5CO0FBQ0EsTUFBRyxDQUFDLE9BQU8sVUFBWCxFQUFzQjtBQUNwQixZQUFRLElBQVIsQ0FBYSx1Q0FBYjtBQUNEO0FBQ0QsTUFBRyxDQUFDLE9BQU8sT0FBWCxFQUFtQjtBQUNqQixZQUFRLElBQVIsQ0FBYSxtQ0FBYjtBQUNEO0FBQ0QsTUFBRyxDQUFDLE9BQU8sZ0JBQVgsRUFBNEI7QUFDMUIsWUFBUSxJQUFSLENBQWEsa0RBQWI7QUFDRDtBQUNELE1BQUcsQ0FBQyxPQUFPLGVBQVgsRUFBMkI7QUFDekIsV0FBTyxlQUFQLEdBQXlCLGlCQUF6QjtBQUNEO0FBQ0QsU0FBTztBQUNMOzs7O0FBSUEsWUFBUSxhQUFhLE1BQWIsQ0FMSDtBQU1MOzs7OztBQUtBLG9CQVhLLDRCQVdZLEtBWFosRUFXa0I7QUFDckIsYUFBTyxXQUFXLGdCQUFYLENBQTRCO0FBQ2pDLGNBQU0sS0FEMkI7QUFFakMsY0FBTSxRQUYyQjtBQUdqQyxvQkFBWSxPQUFPO0FBSGMsT0FBNUIsQ0FBUDtBQUtEO0FBakJJLEdBQVA7QUFtQkQsQ0FqQ0QiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XHJcbmxldCBzZWFyY2hBY3Rpb24gPSByZXF1aXJlKCcuL3NlYXJjaC1hY3Rpb24nKTtcclxuY29uc3QgTkJfU0VBUkNIX0VMRU1FTlQgPSA1MDtcclxuXHJcbiAvKipcclxuICAqIEJ1aWxkZWQgc2VhcmNoIGFjdGlvbi5cclxuICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHVzZWQgdG8gYnVpbGQgdGhlIHNlcnZpY2UsIGl0IHNob3VsZCBoYXZlIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gICogYGBgamF2YXNjcmlwdFxyXG4gICoge1xyXG4gICogICBpZGVudGlmaWVyOiBzdHJpbmc6IHNob3VsZCBiZSAnQURWQU5DRURfU0VBUkNIJyBvciAnUVVJQ0tfU0VBUkNIJ1xyXG4gICogXHRzZXJ2aWNlOntcclxuICAqIFx0XHRzY29wZWQ6IFwiZnVuY3Rpb24gd2hpY2ggbGF1bmNoIHRoZSBzY29wZSBzZWFyY2hcIlxyXG4gICogXHRcdHVuU2NvcGVkOiBcImZ1bmN0aW9uIHdob2NoIGxhdW5jaCB0aGUgdW5zY29wZWQgc2VhcmNoXCJcclxuICAqIFx0fVxyXG4gICogXHRnZXRTZWFyY2hPcHRpb25zIGEgZnVuY3Rpb24gd2hpY2ggZ2V0IHRoZSBhc3NvY2lhdGVkIHNlYXJjaCBzdG9yZSB2YWx1ZVxyXG4gICogXHRuYlNlYXJjaEVsZW1lbnQ6IG51bWJlciBvZiBlbGVtZW50cyB0byByZXF1ZXN0IG9uIGVhY2ggc2VhcmNoLlxyXG4gICogfVxyXG4gICogYGBgXHJcbiAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgYnVpbGRlZCBzZWFyY2ggYWN0aW9uLlxyXG4gICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29uZmlnKXtcclxuICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgaWYoIWNvbmZpZy5pZGVudGlmaWVyKXtcclxuICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYW4gaWRlbnRpZmllcicpO1xyXG4gIH1cclxuICBpZighY29uZmlnLnNlcnZpY2Upe1xyXG4gICAgY29uc29sZS53YXJuKCdZb3VyIGFjdGlvbiBzaG91bGQgaGF2ZSBhIHNlcnZpY2UnKTtcclxuICB9XHJcbiAgaWYoIWNvbmZpZy5nZXRTZWFyY2hPcHRpb25zKXtcclxuICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYSBzZWFyY2ggb3B0aW9ucyBnZXR0ZXIuJyk7XHJcbiAgfVxyXG4gIGlmKCFjb25maWcubmJTZWFyY2hFbGVtZW50KXtcclxuICAgIGNvbmZpZy5uYlNlYXJjaEVsZW1lbnQgPSBOQl9TRUFSQ0hfRUxFTUVOVDtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIC8qKlxyXG4gICAgICogQnVpbGQgdGhlIHNlYXJjaCBmb3IgdGhlIGlkZW50aWZpZXIgc2NvcGUuXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIHNlYXJjaCBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGlkZW50aWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHNlYXJjaDogc2VhcmNoQWN0aW9uKGNvbmZpZyksXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgcXVlcnkgZm9yIHRoZSBpZGVudGlmaWVyIHNjb3BlLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBxdWVyeSB2YWx1ZVxyXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSB1cGRhdGUgcXVlcnkgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBpZGVudGlmaWVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVQcm9wZXJ0aWVzKHZhbHVlKXtcclxuICAgICAgcmV0dXJuIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgICAgZGF0YTogdmFsdWUsXHJcbiAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgaWRlbnRpZmllcjogY29uZmlnLmlkZW50aWZpZXJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIl19