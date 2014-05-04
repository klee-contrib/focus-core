/*global Backbone, window, module*/
(function(NS) {
  "use strict";
  //Filename: models/menuItem.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Notification model
  var MenuItem = Backbone.Model.extend({
    initialize: function initializeMenuItem(options) {
      options = options || {};
      var isSilent = options.isSilent || true;
      //Set the isActive property.
      if(!this.has('isActive')){
        this.set({isActive: false},{silent: isSilent});
      }
    },
    //Change the active mode.
    toggleActive: function toggleActive(){
      this.set('isActive', !this.get('isActive'));
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.MenuItem = MenuItem;
  } else {
    module.exports = MenuItem;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);