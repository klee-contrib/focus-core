/*global Backbone, window, module*/
(function(NS) {
  "use strict";
  //Filename: models/menuItems.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Notification model
  var MenuItems = Backbone.Collection.extend({
    initialize: function initializeMenuItems(options) {
    },
    //Change the active mode.
    toggleActive: function toggleActive(){
      this.set('isActive', !this.get('isActive'));
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.MenuItems = MenuItems;
  } else {
    module.exports = MenuItems;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);