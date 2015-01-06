/*global _, $, i18n*/
"use strict";

//Filename: helpers/odata_helper.js

var utilHelper = require('./util_helper');


var odataOptions = {
    filter: '$filter',
    top: '$top',
    skip: '$skip',
    orderby: '$orderby',
    format: '$format',
    inlinecount: '$inlinecount',
    exportColumnLabels: 'exportColumnLabels',
    requestType: 'GET'
};
var configure = function configure(options) {
    _.extend(odataOptions, options);
};

// type of the request for odata
var paginator_core = function paginator_core() {
    return {
        // the type of the request (GET by default)
        type: odataOptions.requestType,

        // the type of reply (json by default)
        dataType: 'json'
    };
};

function createOdataOptions(criteria, pagesInfo, options) {
    //Compile the odata options.
    var odataOpts = compileOdataOptions(criteria, pagesInfo, options);
    return addOtherOptions(pagesInfo, odataOpts);
}

//Compile options which are not define by odata metadatas.
function addOtherOptions(pagesInfo, odataOptions) {
    odataOptions = odataOptions || {};
    //If necessary, add the export id to the criteria.
    if (pagesInfo.exportId !== undefined) {
        odataOptions.data = odataOptions.data + '&exportId=' + pagesInfo.exportId;
    }
    return odataOptions;
}

// convert JSON criteria to odata
//http://docs.oasis-open.org/odata/odata/v4.0/os/part2-url-conventions/odata-v4.0-os-part2-url-conventions.html#_Toc372793793
function criteriaToOdata(criteria) {
    //console.log("Criteria OData");
    //Url to build
    var result = "";
    for (var property in criteria) {
        //The treatement of the filter is done only.
        if (property !== undefined && property !== null && criteria[property] !== undefined && criteria[property] !== null && criteria[property] !== "") {
            var type = typeof criteria[property];
            console.log("Type of the property", type);
            switch (type) {
                //Deal with the string parameter.
                case "string":
                    result += property + " eq " + criteria[property] + " and ";
                    break;
                    //Deal with array parameters
                case "number":
                    result += property + " eq " + criteria[property] + " and ";
                    break;
                case "boolean":
                    result += property + " eq " + criteria[property] + " and ";
                    break;
                case "array":
                    //result += property + " eq " +"["+ criteria[property].join(',')+"]" + " and ";
                    result += property + " eq " + "['" + criteria[property].join("','") + "']" + " and ";
                    break;
                    //Deal with the object.
                case "object":
                    if (_.isArray(criteria[property])) {
                        result += property + " eq " + "['" + criteria[property].join("','") + "']" + " and ";
                        //result += property + " eq " + "[" + criteria[property].join(',') + "]" + " and "
                    }
                    //If there is an array.
                    break;
                default:
                    break;

            }
        }
    }
    return result.length > 0 ? result.slice(0, -5) : ""; //Todo: corriger la cr�ation de crit�re. //result.substring(0, result.length - 1);
}

//generate orderBy parameters fo odata
function orderToOdata(sortFields) {
    var orderBy = "";
    sortFields.forEach(function(sortField) {
        //TODO : cette condition n'est pas satisfaisante. Si ces champs ne sont pas d�finis ils ne devraient pas �tre dans la liste.
        if (sortField.field !== undefined && sortField.order !== undefined) {
            orderBy += sortField.field + " " + sortField.order + ",";
        }
    });
    return orderBy.substring(0, orderBy.length - 1);
}

//generate parameter for odata server API
function generateServerApi(criteria, pagesInfo) {
    var sortFields = [];
    if (pagesInfo.sortField) {
        sortFields.push(pagesInfo.sortField);
    }

    var val = {};
    val[odataOptions.filter] = criteria; // criteriaToOdata(criteria);
    val[odataOptions.top] = pagesInfo.perPage;
    val[odataOptions.skip] = (pagesInfo.currentPage - 1) * pagesInfo.perPage;
    val[odataOptions.orderby] = orderToOdata(sortFields);
    val[odataOptions.format] = 'json';
    val[odataOptions.inlinecount] = 'allpages';
    var exportColumnLabels = [];
    if (pagesInfo.exportColumnLabels) {
        for (var property in pagesInfo.exportColumnLabels) {
            if (pagesInfo.exportColumnLabels.hasOwnProperty(property)) {
                exportColumnLabels.push({
                    propertyName: property,
                    propertyLabel: i18n.t(pagesInfo.exportColumnLabels[property])
                });
            }
        }
    }
    val[odataOptions.exportColumnLabels] = exportColumnLabels;
    return val;
}

//generate options fo an odata request 
function compileOdataOptions(criteria, pagesInfo, options) {
    var self = pagesInfo;
    options = options || {};

    var server_api = generateServerApi(criteria, pagesInfo);
    // Some values could be functions, let's make sure
    // to change their scope too and run them
    var queryAttributes = {};
    _.each(server_api, function(value, key) {
        if (_.isFunction(value)) {
            value = _.bind(value, self);
            value = value();
        }
        if (value !== undefined && value !== null && value.toString().length > 0) {
            queryAttributes[key] = value;
        }
    });

    var queryOptions = _.clone(paginator_core());
    _.each(queryOptions, function(value, key) {
        if (_.isFunction(value)) {
            value = _.bind(value, self);
            value = value();
        }
        queryOptions[key] = value;
    });

    // Create default values if no others are specified
    queryOptions = _.defaults(queryOptions, {
        timeout: 25000,
        cache: false,
        type: odataOptions.requestType,
        dataType: 'json'
    });

    // Allows the passing in of {data: {foo: 'bar'}} at request time to overwrite server_api defaults
    if (options.data) {
        options.data = decodeURIComponent($.param(_.extend(queryAttributes, options.data)));
    } else {
        options.data = decodeURIComponent($.param(queryAttributes));
    }

    queryOptions = _.extend(queryOptions, {
        data: decodeURIComponent($.param(queryAttributes)),
        processData: false
            //url: _.result(queryOptions, 'url')
    }, options);

    return queryOptions;
}

// parse odata response and return values in format : {totalRecords:totalRecords, values: values}
function parseOdataResponse(response) {
    if (response === undefined || response === null) {
        throw new Error('Odata error : parsing result');
    }
    // To be comaptible with C# ODataController
    _.extend(response, utilHelper.flatten({
        odata: response.odata
    }));
    delete response.odata;
    if (response["odata.count"] === undefined || response["odata.count"] === null) {
        throw new Error('Odata error : parsing result');
    }
    return {
        totalRecords: response["odata.count"],
        values: response.value
    };
}

var odataHelper = {
    createOdataOptions: createOdataOptions,
    parseOdataResponse: parseOdataResponse,
    configure: configure
};
module.exports = odataHelper;