/*global window*/
(function(NS) {
    "use strict";

    // Filename: helpers/metadata_builder.coffee
    NS = NS || {};
    //Dependency gestion depending on the fact that we are in the browser or in node.
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

    var headerHelper = {
        //Process all the data from the header.
        process: function processHeader(headersElements) {
            var headerData = [];
            for (var i = 0, l = headersElements.length; i < l; i++) {
                var active = i === 0 ? "active" : "";
                var subHeaders = headersElements[i].subHeader;
                var subHeaderData = [];
                for (var j = 0; j < subHeaders.length; j++) {
                    var sub2HeaderData = [];
                    if (subHeaders[j].sub2Header !== undefined) {
                        var sub2Headers = subHeaders[j].sub2Header;
                        for (var k = 0; k < sub2Headers.length; k++) {
                            var sub2HeaderName = sub2Headers[k].name;
                            var sub2Header = {
                                cssId: "nav-" + sub2HeaderName,
                                active: "",
                                name: sub2HeaderName,
                                translationKey: "header.subHeaders.sub2Headers." + sub2HeaderName,
                                url: sub2Headers[k].url
                            };
                            sub2HeaderData.push(sub2Header);
                        }
                    }

                    var subHeaderName = subHeaders[j].name;
                    subHeaderData.push({
                        cssId: "nav-" + subHeaderName,
                        active: "",
                        name: subHeaderName,
                        translationKey: "header.subHeaders." + subHeaderName,
                        url: subHeaders[j].url,
                        sub2Headers: sub2HeaderData
                    });
                }
                var name = headersElements[i].name;
                var jsonElement = {
                    cssId: "nav-" + name,
                    active: active,
                    name: name,
                    translationKey: "header." + name,
                    subHeaders: subHeaderData
                };
                if (headersElements[i].url !== undefined) {
                    jsonElement.url = headersElements[i].url;
                }
                headerData.push(jsonElement);
            }
            return headerData;
        }

    };
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.headerHelper = headerHelper;
    } else {
        module.exports = headerHelper;
    }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);