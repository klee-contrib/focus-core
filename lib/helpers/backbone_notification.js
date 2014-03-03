/*global $*/
var Notifications = require('../models/notifications');
var NotificationsView = require('../views/notifications-view');
//Container specific to the application in order to manipulate the notification the way we want.
var backboneNotification = {
  //Contain the a notifications viex in order to add notifications and render it.
  notificationsView: new NotificationsView({
    model: new Notifications()
  }),
  addNotification: function addNotification(jsonNotification, isRender) {
    isRender = isRender || false;
    this.notificationsView.model.add(jsonNotification);
    if (isRender) {
      this.renderNotifications();
    }
  },
  //Render all the notifications which are in the notifications collection and then clear this list.
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
  //Clear all the notifications in the application on application screen but do not clear the collection.
  clearNotifications: function clearNotifications(selectorToRender) {
    var selector = selectorToRender || "div#summary";
    $(selector).html('');
    $('button').button('reset');
  },
  //Clear all error on page 
  clearErrors: function clearErrors(selectorToRender) {
    var selector = selectorToRender || "div.notifications div.alert-danger";
    $(selector).remove();
    $('button').button('reset');
  }
};
module.exports = backboneNotification;
//How to require it:
//window.Backbone.Notification = require('lib/backbone_notification');