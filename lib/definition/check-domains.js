'use strict';

var keys = require('lodash/object/keys');

var _require = require('lodash/array');

var intersection = _require.intersection;
var uniq = _require.uniq;
var difference = _require.difference;

module.exports = function (entityDef, domains) {
  domains = Object.keys(domains);
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
  if (missingDomains.length > 0) {
    console.warn('Missing domain\'s definition', missingDomains);
  }
  var useLessDomains = difference(domains, _.intersection(appDomains, domains));
  if (useLessDomains > 0) {
    console.warn('Useless domain\'s definition', useLessDomains);
  }

  console.info('####################################################################');
};