"use strict";
/*global window*/
(function(NS) {
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
        var name = headersElements[i].name;
        var jsonElement = {
          cssId: "nav-" + name,
          active: active,
          name: name,
          transalationKey: "header." + name
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