/*global Backbone, window, module, _*/
(function(NS) {
  "use strict";
  //Filename: models/menuItems.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var HeaderItem = isInBrowser ? NS.Models.HeaderItem : require('header-item');
  var util = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');

  //Notification model
  var HeaderItems = Backbone.Collection.extend({
    model: HeaderItem,
    //Change the active mode.
    changeActive: function changeActive(nodeName) {
      if (nodeName === undefined || nodeName === this.currentActiveName) {
        return;
      }
      //Get the current and the new active item.
      var current = this.findWhere({
        isActive: true
      });
      var newActive = this.findWhere({
        name: nodeName
      });

      //Check if there is a change
      if (current && newActive) {
        current.set({
          isActive: false
        }, {silent: true});
      }
      if (newActive) {
        newActive.set({
          isActive: true
        }, {silent: true});
      }
      this.trigger("change");
    },
    toActiveJSON: function toActiveJSON(){
      return _.filter(this.toJSON(),function(element){return true;/*this.get('name').indexOf(util. this.currentActiveName) === 0;*/});
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.HeaderItems = HeaderItems;
  } else {
    module.exports = HeaderItems;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);