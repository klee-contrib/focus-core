/*global Backbone, i18n, $, window*/
"use strict";
(function(NS) {
	// Filename: views/search-results-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var ListView = isInBrowser ? NS.Views.ListView : require('./list-view');

	var SearchResultsView = ListView.extend({
	    
	});

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.SearchResultsView = SearchResultsView;
	} else {
		module.exports = SearchResultsView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);