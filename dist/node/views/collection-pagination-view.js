/*global Backbone, window*/
//var template = require("../template/collection-pagination");
(function(NS) {
  //Filename: views/collection-pagination-view.js
  "use strict";
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var CollectionPaginationView = Backbone.View.extend({
    Service: undefined,
    initialize: function initializePagination() {

    },
    events: {},
    goToPage: function goToPage(page) {
      this.model.setPage(page);
    },
    nextPage: function nextPage() {
      this.model.setNextPage();
    },
    previousPage: function PreviousPage() {
      this.model.setPreviousPage();
    },
    render: function renderPagination() {
      if (this.model.length === 0) {
        this.$el.html("");
      } else {
        this.$el.html(this.template(this.model.pageInfo()));
      }
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.CollectionPaginationView = CollectionPaginationView;
  } else {
    module.exports = CollectionPaginationView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);