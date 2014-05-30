/* global Backbone, window, _, $*/
(function(NS) {
  "use strict";
  //Filename: views/header-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var util = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
  var HeaderItems = isInBrowser ? NS.Models.HeaderItems : require('../models/header-items');
  var HeaderItemsView = isInBrowser ? NS.Views.HeaderItemsView : require('./header-items-view');
  var siteDescriptionHelper =  isInBrowser ? NS.Helpers.siteDescriptionHelper : require('../helpers/site_description_helper');
  var template = isInBrowser ? NS.templates.header : function(){};
  var headerView = Backbone.View.extend({

    //Name of the level layer.
    levelName: "level_",
    template: template,
    //Default name of the container for the header.
    defaultContainerName: ".header",
    //Example of definition of a different view for a header level:
    // Inside the ViewForLevel => Add a property with levelName_[index] and a reference to the view you want.
    //Warning, this is insife the prototype, only one headerview per application.  
    ViewForLevel:{
      "level_0": undefined,
      "level_1": undefined,
      "level_2": undefined,
      "level_3": undefined
    },
    HeaderItemsView: HeaderItemsView,
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
      //Contains all the params for the levels.
      this.levelParams = {};

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
    processSite: function processSiteHeaderView(site) {
      var grouped = util.groupBySplitChar(site);
      //Erase previous view.
      for (var i = 0; i < this.maxLevel; i++) {
        this[this.levelName + i].remove();
        //Remove the level.
        delete this[this.levelName + i];//See if it is necessary.
        //Remove the param inside the object.
        delete this.levelParams[levelName];
      }
      var allParams = siteDescriptionHelper.getParams();
      //Create new views
      var index = 0;
      for (var prop in grouped) {
         var levelName = this.levelName + index;
         var menuItms = _.values(grouped[prop]);
         var levelParams = this.processLevelParams(menuItms, index, allParams);
        //Wich view for the view level.
        var HeaderItemsViewOfLevel = this.ViewForLevel[levelName] || this.HeaderItemsView;
        this[levelName] = new HeaderItemsViewOfLevel({
            model: new HeaderItems(menuItms),
            levelParams: this.levelParams[levelName]
        });
        index++;
      }
      //define the max profoundness level.
      this.maxLevel = index;
      this.render();
    },
    //Process the level params for the next level.
    processLevelParams: function (menuItemsArray, indexLevel, params) {
        var itemsWithParams = _.filter(menuItemsArray, function (element) { return element.requiredParams !== undefined });
        //If there is no element 
        if (!_.isArray(itemsWithParams)) { return undefined; }

        var processParams = {};
        for (var i = 0, l = itemsWithParams.length; i < l; i++) {
            var itemWithParams = itemsWithParams[i];
            if (itemWithParams !== undefined && itemWithParams.name !== undefined && itemWithParams.requiredParams !== undefined && _.isArray(itemWithParams.requiredParams)) {
                var paramsOfItem = {};
                //Build a param object for each param
                for (var j = 0, ln = itemWithParams.requiredParams.length; j < ln; j++) {
                    var paramName = itemWithParams.requiredParams[j];
                    paramsOfItem[paramName] = params[paramName];
                }
                processParams[itemWithParams.name] = paramsOfItem;
            }  
        }
        //Register a nexlevel params only if necessary.
        if (!_.isEmpty(processParams)) {
            var nextLevelName = this.levelName + (indexLevel + 1);
            this.levelParams[nextLevelName] = processParams;
        }

    },

    //Render all the headers items.
    render: function renderHeaders() {
      this.$el.html(this.template());
      for (var i = 0; i < this.maxLevel; i++) {
        $(this.opts.containerName,this.$el).append( this[this.levelName + i].render().el);
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