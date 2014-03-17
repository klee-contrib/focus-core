/*global _, $*/
/* Filename: helpers/odata_helper.js*/
(function(NS) {
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    // type of the request for odata
    var paginator_core = {
        // the type of the request (GET by default)
        type: 'GET',

        // the type of reply (json by default)
        dataType: 'json'
    };

    function createOdataOptions(criteria, pagesInfo, options) {
        return compileOptions(criteria, pagesInfo, options);
    }

    // convert JSON criteria to odata
    function criteriaToOdata(criteria) {
        var result = "";
        for (var property in criteria) {
            if (criteria[property] !== undefined && criteria[property] !== null && criteria[property].length > 0) {
                result += property + " eq " + criteria[property] + ",";
            }
        }
        return result.substring(0, result.length - 1);
    }

    //generate orderBy parameters fo odata
    function orderToOdata(sortFields) {
        var orderBy = "";
        sortFields.forEach(function(sortField) {
            orderBy += sortField.field + " " + sortField.order + ",";
        });
        return orderBy.substring(0, orderBy.length - 1);
    }

    //generate parameter for odata server API
    function generateServerApi(criteria, pagesInfo) {
        var sortFields = [];
        if (pagesInfo.sortField) {
            sortFields.push(pagesInfo.sortField);
        }
        return {
            // the query field in the request
            '$filter': criteriaToOdata(criteria),
            // number of items to return per request/page
            '$top': pagesInfo.perPage,
            //records to bypass
            '$skip': pagesInfo.currentPage * pagesInfo.perPage,
            // field to sort by
            '$orderby': orderToOdata(sortFields),
            // what format would you like to request results in?
            '$format': 'json',
            // custom parameters
            '$inlinecount': 'allpages'
            //callback odata
            //'$callback': 'callback'
        };
    }

    //generate options fo an odata request 
    function compileOptions(criteria, pagesInfo, options) {
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

        var queryOptions = _.clone(paginator_core);
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
            type: 'GET',
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
        if (response === undefined || response === null || response["odata.count"] === undefined || response["odata.count"] === null) {
            throw new Error('Odata error : parsing result');
        }
        return {
            totalRecords: response["odata.count"],
            values: response.value
        };
    }

    odataHelper = {
        createOdataOptions: createOdataOptions,
        parseOdataResponse: parseOdataResponse
    };

    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.odataHelper = odataHelper;
    } else {
        module.exports = odataHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);