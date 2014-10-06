/*global Backbone, window, module*/
(function(NS) {
  "use strict";
  //Filename: models/headerItems.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Menu item model
  var HeaderItem = Backbone.Model.extend({
    defaults: {
      cssId: "",
      cssClass: "",
      dataAttributes: "",
      isActive: false,
      name: undefined,
      transalationKey: "",
      url: "#nav"
    },
    initialize: function initializeMenuItem(options) {
      options = options || {};
      /*if(this.has('route')){
        this.set({url: this.get('route')}, {silent: true});
      }*/
    },
    //Change the active mode.
    toggleActive: function toggleActive() {
      this.set('isActive', !this.get('isActive'));
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.HeaderItem = HeaderItem;
  } else {
    module.exports = HeaderItem;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);