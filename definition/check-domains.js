'use strict';

var keys = require('lodash/object/keys');

var _require = require('lodash/array');

var intersection = _require.intersection;
var uniq = _require.uniq;
var difference = _require.difference;


module.exports = function checkDomain(entityDef, domains) {
    domains = keys(domains);
    var arr = [];
    for (var node in entityDef) {
        for (var sub in entityDef[node]) {
            arr.push(entityDef[node][sub].domain);
        }
    }
    var appDomains = uniq(arr);
    console.info('########################## DOMAINS ##############################');
    console.info('Entity definitions domains: ', appDomains);
    console.info('Domains with a definition', domains);
    var missingDomains = difference(appDomains, intersection(appDomains, domains));
    if (0 < missingDomains.length) {
        console.warn('Missing domain\'s definition', missingDomains);
    }
    var useLessDomains = difference(domains, intersection(appDomains, domains));
    if (0 < useLessDomains) {
        console.warn('Useless domain definition', useLessDomains);
    }
    console.info('####################################################################');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sT0FBTyxRQUFRLG9CQUFSLENBQWI7O2VBQ3VDLFFBQVEsY0FBUixDOztJQUFsQyxZLFlBQUEsWTtJQUFjLEksWUFBQSxJO0lBQU0sVSxZQUFBLFU7OztBQUV6QixPQUFPLE9BQVAsR0FBaUIsU0FBUyxXQUFULENBQXFCLFNBQXJCLEVBQWdDLE9BQWhDLEVBQXdDO0FBQ3JELGNBQVUsS0FBSyxPQUFMLENBQVY7QUFDQSxRQUFJLE1BQU0sRUFBVjtBQUNBLFNBQUssSUFBSSxJQUFULElBQWlCLFNBQWpCLEVBQTRCO0FBQ3hCLGFBQUssSUFBSSxHQUFULElBQWdCLFVBQVUsSUFBVixDQUFoQixFQUFpQztBQUM3QixnQkFBSSxJQUFKLENBQVMsVUFBVSxJQUFWLEVBQWdCLEdBQWhCLEVBQXFCLE1BQTlCO0FBQ0g7QUFDSjtBQUNELFFBQU0sYUFBYSxLQUFLLEdBQUwsQ0FBbkI7QUFDQSxZQUFRLElBQVIsQ0FBYSxtRUFBYjtBQUNBLFlBQVEsSUFBUixDQUFhLDhCQUFiLEVBQTZDLFVBQTdDO0FBQ0EsWUFBUSxJQUFSLENBQWEsMkJBQWIsRUFBMEMsT0FBMUM7QUFDQSxRQUFNLGlCQUFpQixXQUFXLFVBQVgsRUFBdUIsYUFBYSxVQUFiLEVBQXlCLE9BQXpCLENBQXZCLENBQXZCO0FBQ0EsUUFBRyxJQUFJLGVBQWUsTUFBdEIsRUFBNkI7QUFDekIsZ0JBQVEsSUFBUixDQUFhLDhCQUFiLEVBQTZDLGNBQTdDO0FBQ0g7QUFDRCxRQUFNLGlCQUFpQixXQUFXLE9BQVgsRUFBb0IsYUFBYSxVQUFiLEVBQXlCLE9BQXpCLENBQXBCLENBQXZCO0FBQ0EsUUFBRyxJQUFJLGNBQVAsRUFBc0I7QUFDbEIsZ0JBQVEsSUFBUixDQUFhLDJCQUFiLEVBQTBDLGNBQTFDO0FBQ0g7QUFDRCxZQUFRLElBQVIsQ0FBYSxzRUFBYjtBQUNILENBckJEIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGtleXMgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L2tleXMnKTtcclxubGV0IHtpbnRlcnNlY3Rpb24sIHVuaXEsIGRpZmZlcmVuY2V9ID0gcmVxdWlyZSgnbG9kYXNoL2FycmF5Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNoZWNrRG9tYWluKGVudGl0eURlZiwgZG9tYWlucyl7XHJcbiAgICBkb21haW5zID0ga2V5cyhkb21haW5zKTtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIGZvciAobGV0IG5vZGUgaW4gZW50aXR5RGVmKSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViIGluIGVudGl0eURlZltub2RlXSkge1xyXG4gICAgICAgICAgICBhcnIucHVzaChlbnRpdHlEZWZbbm9kZV1bc3ViXS5kb21haW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGFwcERvbWFpbnMgPSB1bmlxKGFycik7XHJcbiAgICBjb25zb2xlLmluZm8oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIERPTUFJTlMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJyk7XHJcbiAgICBjb25zb2xlLmluZm8oJ0VudGl0eSBkZWZpbml0aW9ucyBkb21haW5zOiAnLCBhcHBEb21haW5zKTtcclxuICAgIGNvbnNvbGUuaW5mbygnRG9tYWlucyB3aXRoIGEgZGVmaW5pdGlvbicsIGRvbWFpbnMpO1xyXG4gICAgY29uc3QgbWlzc2luZ0RvbWFpbnMgPSBkaWZmZXJlbmNlKGFwcERvbWFpbnMsIGludGVyc2VjdGlvbihhcHBEb21haW5zLCBkb21haW5zKSk7XHJcbiAgICBpZigwIDwgbWlzc2luZ0RvbWFpbnMubGVuZ3RoKXtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgZG9tYWluXFwncyBkZWZpbml0aW9uJywgbWlzc2luZ0RvbWFpbnMpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXNlTGVzc0RvbWFpbnMgPSBkaWZmZXJlbmNlKGRvbWFpbnMsIGludGVyc2VjdGlvbihhcHBEb21haW5zLCBkb21haW5zKSk7XHJcbiAgICBpZigwIDwgdXNlTGVzc0RvbWFpbnMpe1xyXG4gICAgICAgIGNvbnNvbGUud2FybignVXNlbGVzcyBkb21haW4gZGVmaW5pdGlvbicsIHVzZUxlc3NEb21haW5zKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuaW5mbygnIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKTtcclxufTtcclxuIl19