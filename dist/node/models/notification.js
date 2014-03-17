/*global Backbone, window, module*/
"use strict";
(function(NS) {
  /* Filename: models/notification.js */
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Notification model
  var Notification = Backbone.Model.extend({
    defaults: {
      type: undefined, //error/warning/success...
      message: undefined // The message which have to be display.
    },
    initialize: function initializeNotification() {
      this.set({
        creationDate: new Date()
      }, {
        silent: true
      });
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.Notification = Notification;
  } else {
    module.exports = Notification;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);