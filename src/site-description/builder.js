import clone from 'lodash/lang/clone';
import find from 'lodash/collection/find';
import some from 'lodash/collection/some';

import userHelper from '../user';
import siteDescriptionReader from './reader';

//Container for the site description and routes.
let siteDescription, routes = {}, siteStructure = {};
const EMPTY = '';

//Process the name of
function _processName(pfx, eltDescName) {
    if (pfx === undefined || pfx === null) {
        pfx = EMPTY;
    }
    if (eltDescName === undefined || eltDescName === null) {
        return pfx;
    }
    if (pfx === EMPTY) {
        return eltDescName;
    }
    return pfx + '.' + eltDescName;
}
//Process the deaders element of the site description element.
function _processHeaders(siteDesc, prefix) {

    if (!siteDesc.headers) {
        return;
    }
    //console.log('headers', siteDesc.headers, 'prefix', prefix);
    let headers = siteDesc.headers;
    let isInSiteStructure = false;
    if (siteDescriptionReader.checkParams(siteDesc.requiredParams)) {
        isInSiteStructure = true;
    }
    for (let i in headers) {
        _processElement(headers[i], prefix, { isInSiteStructure: isInSiteStructure });
    }
}

//Process the pages element of the site description.
function _processPages(siteDesc, prefix) {
    if (siteDesc.pages !== undefined && siteDesc.pages !== null) {
        //console.log('pages', siteDesc.pages, 'prefix', prefix);

        for (let i in siteDesc.pages) {
            _processElement(siteDesc.pages[i], prefix);
        }
    }
}

//Process the route part of the site description element.
function _processRoute(siteDesc, prefix, options) {
    options = options || {};
    //if (siteDesc.roles !== undefined && siteDesc.url !== undefined)
    //console.log('route', siteDesc.url, 'prefix', prefix);

    if (userHelper.hasRole(siteDesc.roles)) {
        let route = {
            roles: siteDesc.roles,
            name: prefix,
            route: siteDesc.url,
            regex: routeToRegExp(siteDesc.url),
            requiredParams: siteDesc.requiredParams
        };
        //Call the Backbone.history.handlers....
        //console.log('*****************');
        //console.log('ROute name: ',route.route);
        //console.log('Route handler name : ',  findRouteName(route.route.substring(1)));
        routes[findRouteName(route.route.substring(1))] = route;
        if (options.isInSiteStructure) {
            siteStructure[prefix] = route;
        }
    }
}


function _processElement(siteDescElt, prefix, options) {
    options = options || {};
    if (!siteDescElt) {
        console.warn('The siteDescription does not exists', siteDescElt);
        return;
    }
    let pfx = _processName(prefix, siteDescElt.name);
    //if(siteDescriptionReader.checkParams(siteDescElt.requiredParams)){
    _processHeaders(siteDescElt, pfx);
    //}
    _processPages(siteDescElt, pfx);
    _processRoute(siteDescElt, pfx, options);
}


//Find a route with its name.
// _routeToTest_ : Route to test.
// *return* : The handler route name.
function findRouteName(routeToTest) {
    if (!window.Backbone) {
        throw new Error('Dependency: Backbone is missing.');
    }
    let handlers = window.Backbone.history.handlers;
    //console.log('handlers', )
    let h = find(handlers, function (handler) {
        return handler.route.test(routeToTest);
    });
    if (h !== undefined) {
        return h.route.toString();
    }
    return some(handlers, function (handler) {
        if (handler.route.test(routeToTest)) {
            return handler.route.toString();
        }
    });
}


//Convert a route to regexp
const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
function routeToRegExp(route) {
    route = route.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function (match, optional) {
            return optional ? match : '([^/?]+)';
        })
        .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}

//Get the siteDescription.
function getSiteDescription() {
    return clone(siteDescription);
}

//Get all the application routes from the siteDescription.
function getRoute(routeName) {
    return clone(routes[routeName]);
}
function getRoutes() {
    return clone(routes);
}

function getSiteStructure() {
    return clone(siteStructure);
}
//Process the siteDescription if necessary.
function processSiteDescription(options) {
    options = options || {};
    if (!siteDescriptionReader.isProcessed() || options.isForceProcess) {
        siteDescription = siteDescriptionReader.getSite();
        regenerateRoutes();
        return siteDescription;
    }
    return false;
}

//Regenerate the application routes.
function regenerateRoutes() {
    //Clean all previous registered routes.
    routes = {};
    siteStructure = {};
    //Process the new routes.
    _processElement(siteDescription);
}

export {
    getRoute,
    getRoutes,
    getSiteDescription,
    regenerateRoutes,
    getSiteStructure,
    processSiteDescription,
    findRouteName,
    routeToRegExp
};

export default {
    getRoute,
    getRoutes,
    getSiteDescription,
    regenerateRoutes,
    getSiteStructure,
    processSiteDescription,
    findRouteName,
    routeToRegExp
};
