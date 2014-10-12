/*global Backbone, window, module*/
"use strict";
(function(NS) {
  //Filename: models/notification.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Notification model
  /**
   * [initialize description]
   * @param  {[type]} )  {                 this.set({                   creationDate: new Date()                       } [description]
   * @param  {[type]} {                                silent: true      });                      }  } [description]
   * @return {[type]}    [description]
   */
  var Notification = Backbone.Model.extend({
    defaults: {
      /**
       * [type description]
       * @type {[type]}
       */
      type: undefined, //error/warning/success...
      message: undefined, // The message which have to be display.
      creationDate: undefined
    },
    /**
     * Initialize the date of the notification.
     * @return {undefined}
     */
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