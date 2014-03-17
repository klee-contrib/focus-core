	/*global _, Backbone*/

	(function(NS) {
		  /* Filename: models/notifications.js */
		NS = NS || {};
		//Dependency gestion depending on the fact that we are in the browser or in node.
		var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
		var Notification = isInBrowser ? NS.Models.Notifications : require('/.notification');

		//This collection will contains all the message which will be display in the application.
		var Notifications = Backbone.Collection.extend({
			model: Notification,
			// Return a constructed object filtered by error type.
			getMessagesByType: function filterByTypeMessage() {
				var jsonCollection = this.toJSON();
				var messages = {};
				messages.errorMessages = _.where(jsonCollection, {
					'type': 'error'
				});
				messages.warningMessages = _.where(jsonCollection, {
					'type': 'warning'
				});
				messages.infoMessages = _.where(jsonCollection, {
					'type': 'info'
				});
				messages.successMessages = _.where(jsonCollection, {
					'type': 'success'
				});
				return messages;
			},
			//Create a comparatot method in order to be able to sort them on their type
			comparator: function comparator(notification) {
				return notification.get("creationDate");
			}
		});

		// Differenciating export for node or browser.
		if (isInBrowser) {
			NS.Models = NS.Models || {};
			NS.Models.Notifications = Notifications;
		} else {
			module.exports = Notifications;
		}
	})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);