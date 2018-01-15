import keys from 'lodash/object/keys';
import intersection from 'lodash/array/intersection';
import uniq from 'lodash/array/uniq';
import difference from 'lodash/array/difference';

export default function checkDomain(entityDef, domains) {
    domains = keys(domains);
    let arr = [];
    for (let node in entityDef) {
        for (let sub in entityDef[node]) {
            arr.push(entityDef[node][sub].domain);
        }
    }
    const appDomains = uniq(arr);
    console.info('########################## DOMAINS ##############################');
    console.info('Entity definitions domains: ', appDomains);
    console.info('Domains with a definition', domains);
    const missingDomains = difference(appDomains, intersection(appDomains, domains));
    if (0 < missingDomains.length) {
        console.warn('Missing domain\'s definition', missingDomains);
    }
    const useLessDomains = difference(domains, intersection(appDomains, domains));
    if (0 < useLessDomains) {
        console.warn('Useless domain definition', useLessDomains);
    }
    console.info('####################################################################');
}
