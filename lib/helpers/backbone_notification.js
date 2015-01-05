/*global $,window*/

/**
 * @module helpers/backbone_notifications
 * @description Global notifications mecanism around the whole application.
 * @see file helpers/backbone_notifications.js
 * @author  pbesson
 */
"use strict";
  var Notifications = require('../models/notifications');
  var NotificationsView = require('../views/notifications-view');
 
  /**
   * Container specific to the application in order to manipulate the notification the way we want.
   * @type {Object}
   */
  var backboneNotification = {
    
    /**
     * An instance of the notifications view in order to deal with the notifications.
     * Which has a Notifications Model. This view is able to manipulate notifications and to render them.
     * @type {NotificationsView}
     */
    notificationsView: new NotificationsView({
      model: new Notifications()
    }),
    
    /**
     * Add a notification in the stack. Is isRender is define and is true, the notifications are displayed.
     * @param {object}  jsonNotification - A json object representing the notification. Types: warning, error, success.
     * @param {Boolean} isRender         - Is isRender is define and is true, the notifications are displayed immediately.
     * @example `Fmk.helpers.backboneNotifications.addNotification({type: "error", message: "Message"}, true);`
     *   
     */
    addNotification: function addNotification(jsonNotification, isRender) {
      isRender = isRender || false;
      this.notificationsView.model.add(jsonNotification);
      if (isRender) {
        this.renderNotifications();
      }
    },
 
    /**
     * Render all the notifications which are in the notifications collection and then clear this list.
     * Once the notifications have been rendered, the messages stack is cleared
     * @param  {string} selectorToRender - A css selector twhich define where the notifications are redered. Default us "div#summary"
     * @param  {integer} timeout         - If a timeout is define, the notification is hidden after _timeout_ seconds.
     * @return {undefined}
     */
    renderNotifications: function renderInApplication(selectorToRender, timeout) {
      var selector = selectorToRender || "div#summary";
      //We render all the messages.
      $(selector).html(this.notificationsView.render().el);
      //We empty the collection which contains all the notification messages.
      this.notificationsView.model.reset();
      $('button').button('reset');
      var that = this;
      //timeout = timeout || 5;
      /*Notifications are displayed only timeout seconds.*/
      if (timeout !== null && timeout !== undefined) {
        setTimeout(function() {
          that.clearNotifications(selector);
        }, timeout * 1000);
      }
    },
    
    /**
     * Clear all the displayed notifications.
     * @param  {string} selectorToRender The css selector describing where the notifications are rendered. Default is "div#summary".
     * @return @return {undefined}
     */
    clearNotifications: function clearNotifications(selectorToRender) {
      var selector = selectorToRender || "div#summary";
      $(selector).html('');
      $('button').button('reset');
    },
    
    /**
     * Clear only the errors in the display of the screen.
     * @param  {string} selectorToRender The css selector describing where the notifications are rendered. Default is "div.notifications div.alert-danger".
     * @return {[type]}                  [description]
     */
    clearErrors: function clearErrors(selectorToRender) {
      var selector = selectorToRender || "div.notifications div.alert-danger";
      $(selector).html('');
      $('button').button('reset');
    }
  };
  module.exports = backboneNotification;