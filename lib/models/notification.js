/*global Backbone*/
//Notification model
module.exports = Backbone.Model.extend({
	defaults: {
		type: undefined, //error/warning/success...
		message: undefined, // The message which have to be display.,
		creationDate: new Date()
	}
});