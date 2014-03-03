var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var ErrorHelper = require('../../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'consultView',
	getModel: undefined,
	deleteModel: undefined,

	initialize: function initializeConsult() {
		//render view when the model is loaded
		this.model.on('change', this.render, this);
		if (this.model.has('id')) {
			var view = this;
			this.getModel(this.model.get('id'))
				.then(function success(jsonModel){
					view.model.set(jsonModel);
				})
				.catch(function error(error){
					console.log('erreur : ' + error);
				});
		}
	},

	events: {
		"click button#btnEdit": "edit",
		"click button#btnDelete": "delete"
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataConsult() {
		throw new NotImplementedException('getRenderData');
	},

	//genarate navigation url.
	generateEditUrl: function generateEditUrl(){
		return this.model.modelName + "/edit/" + this.model.get('id');
	},

	edit: function editVm(event) {
		event.preventDefault();
		Backbone.history.navigate(this.generateEditUrl(), true);
	},

	delete: function deleteConsult(event) {
		event.preventDefault();
		var view = this;
		//call suppression service
		this.deleteModel()
			.then(function success(success) {
				view.deleteSuccess(success);
			}, function error(errorResponse) {
				view.deleteError(errorResponse);
			})
	},

	//Generate delete navigation url.
	generateDeleteUrl: function generateDeleteUrl(){
		return "/";
	},

	// Actions after a delete success.
	deleteSuccess: function deleteConsultSuccess(response) {
		//remove the view from the DOM
		this.remove();
		//navigate to next page
		Backbone.history.navigate(generateDeleteUrl(), true);
	},

	// Actions after a delete error. 
	deleteError: function deleteConsultError(errorResponse) {
		ErrorHelper.manageResponseErrors(errorResponse, {
			isDisplay: true
		});
	},

	render: function renderVirtualMachine() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});