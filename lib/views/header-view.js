/* global Backbone, window, _, $*/
(function(NS) {
  "use strict";
  //Filename: views/header-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var util = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
  var HeaderItems = isInBrowser ? NS.Models.HeaderItems : require('../models/header-items');
  var HeaderItemsView = isInBrowser ? NS.Views.HeaderItemsView : require('./header-items-view');

  var headerView = Backbone.View.extend({

    //Name of the level layer.
    levelName: "level_",

    //Default name of the container for the header.
    defaultContainerName: "#header",
    
    //Initialize the header view.
    initialize: function initializeHeaderView(options) {
      options = options || {};
      this.opts = _.extend({containerName: this.defaultContainerName},options);
      if (options.site) {
        this.processSite(options.site);
      }
      if (options.active) {
        this.processActive(options.active);
      }

    },

    //Process the active menu item.
    processActive: function processActive(activeNode) {
      if (this.active === activeNode) {
        return;
      }
      var split = activeNode.split('.');
      this.level = split.length; //+1?

      for (var i = 0; i < this.maxLevel; i++) {
        //If the view is in the level.
        if (i < this.level) {
          //Test the depth.
          this[this.levelName + i].model.changeActive(util.splitLevel(activeNode, {depth: i+1}));
        } else {
          this[this.levelName + i].hide();
        }
      }
    },

    //Process the site map.
    processSite: function processSite(site) {
      var grouped = util.groupBySplitChar(site);
      //Erase previous view.
      for (var i = 0; i < this.maxLevel; i++) {
        this[this.levelName + i].remove();
        delete this[this.levelName + i];//See if it is necessary.
      }
      //Create new views
      var index = 0;
      for (var prop in grouped) {
        this[this.levelName + index] = new HeaderItemsView({
          model: new HeaderItems(_.values(grouped[prop]))
        });
        index++;
      }
      //define the max profoundness level.
      this.maxLevel = index;
      this.render();
    },

    //Render all the headers items.
    render: function renderHeaders() {
      this.$el.html('');
      for (var i = 0; i < this.maxLevel; i++) {
        this.$el.append( this[this.levelName + i].render().el);
      }
      return this;
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