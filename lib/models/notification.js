/*global Backbone,  module*/
"use strict";

//Filename: models/notification.js
//Dependency gestion depending on the fact that we are in the browser or in node.

//Notification model
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

module.exports = Notification;