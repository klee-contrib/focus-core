/*global Backbone, window*/
"use strict";
(function(NS) {
	//Filename: views/notifications-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var template = isInBrowser ? NS.templates.notifications : ""; //require('./templates/notifications'); //Todo: call a handlebars function.
	var NotificationsView = Backbone.View.extend({
		tagName: 'div',
		className: 'notifications',
		template: template,
		//Render each type of notification.
		render: function() {
			var messages = this.model.getMessagesByType();
			/*We have to add css property to the message in order  to use the same template.*/
			var messageToPrint = {};
			messageToPrint.errorMessages = {
				messages: messages.errorMessages,
				cssMessageType: 'danger'
			};
			messageToPrint.warningMessages = {
				messages: messages.warningMessages,
				cssMessageType: 'warning'
			};
			messageToPrint.successMessages = {
				messages: messages.successMessages,
				cssMessageType: 'success'
			};
			messageToPrint.infoMessages = {
				messages: messages.infoMessages,
				cssMessageType: 'info'
			};
			this.$el.html('');
			//In order to call the templat only if needed.
			function printMessageIfExists(messageContainerName, context) {
				if (messages[messageContainerName].length > 0) {
					context.$el.append(template(messageToPrint[messageContainerName]));
				}
			}
			printMessageIfExists('errorMessages', this); //The this is put into a closure in order to not lose it.
			printMessageIfExists('warningMessages', this);
			printMessageIfExists('infoMessages', this);
			printMessageIfExists('successMessages', this);
			return this;
		},
		initialize: function initialize() {
			//We bind the model changes to a render.
			this.model.on('change', function() {
				this.render();
			});
		}
	});


	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.NotificationsView = NotificationsView;
	} else {
		module.exports = NotificationsView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);