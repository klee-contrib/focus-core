/*global _, Backbone*/
//We get the model of the collection.
var Notification = require('./notification');
//This collection will contains all the message which will be display in the application.
module.exports = Backbone.Collection.extend({
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