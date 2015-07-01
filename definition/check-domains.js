let keys = require('lodash/object/keys');
let {intersection, uniq, difference} = require('lodash/array');

module.exports = (entityDef, domains)=>{
  domains = Object.keys(domains);
  let arr = [];
  for (let node in entityDef) {
    for (let sub in entityDef[node]) {
        arr.push(entityDef[node][sub].domain);
    }
  }
  let appDomains = uniq(arr);
  console.info('########################## DOMAINS ##############################');
  console.info('Entity definitions domains: ', appDomains);
  console.info('Domains with a definition',domains);
  let missingDomains = difference(appDomains, intersection(appDomains,domains));
  if(missingDomains.length > 0){
    console.warn('Missing domain\'s definition', missingDomains);
  }
  let useLessDomains =difference(domains, _.intersection(appDomains,domains));
  if(useLessDomains > 0){
    console.warn('Useless domain\'s definition',useLessDomains);
  }

  console.info('####################################################################');
}
