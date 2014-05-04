/* global Backbone, window*/
(function(NS) {
  "use strict";
  //Filename: views/header-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var util = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
  var MenuItems = isInBrowser ? NS.Models.MenuItems : require('../views/menu_items');
  var headerView = Backbone.View.extend({
    initialize: function initializeHeaderView(options) {
      options = options || {};
      if (options.site) {
        this.processSite(options.site);
      }
      if (options.active) {
        this.processActive();
      }

    },
    processActive: function processActive(activeNode){
      if(this.active === activeNode){
        return;
      }
      var split = activeNode.split('.');
      this.level = split.length(); //+1?

    },
    processSite: function processSite(site) {
      var grouped = util.groupBySplitChar(site);
      var i = 0;
      for (var prop in grouped) {
        this[i] = new MenuItems(grouped[prop]);
        i++;
      }
      this.maxLevel = i;
    }

  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.HeaderView = headerView;
  } else {
    module.exports = headerView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);