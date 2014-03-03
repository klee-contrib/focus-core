/*global Backbone, _, $, i18n*/
var form_helper = require('../../lib/form_helper');
var _url = require('../../lib/url_helper');
var ErrorHelper = require('../../lib/error_helper');
var ModelValidator = require('../../lib/model-validation-promise');

//var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'editView',
	saveModel: undefined, //VmSvc.save
	getModel: undefined, //VmSvc.get

	initialize: function initializeEdit() {
		this.model.on('change', this.render, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		if (this.model.has('id')) {
			var view = this;
			this.getModel(this.model.get('id'))
				.then(function success(jsonModel){
					view.model.set(jsonModel);
				});
		}
	},

	events: {
		"click button[type='submit']": "save",
		"click button#btnCancel": "cancelEdition",
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataEdit() {
		throw new NotImplementedException('getRenderData');
	},

	save: function saveEdit(event) {
		event.preventDefault();
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);

		var currentView = this;
		ModelValidator.validate(currentView.model)
			.then(function() {
				currentView.model.unsetErrors();
				currentView.saveModel(currentView.model.toJSON())
					.then(function success(jsonModel){
						currentView.saveSuccess(jsonModel);
					})
					.catch (function error(responseError){
						currentView.saveError(responseError);
					});
			})
			.catch (function error(errors){
				currentView.model.setErrors(errors);
			});
	},

	//Actions on save success.
	saveSuccess: function saveSuccess(jsonModel) {
		Backbone.Notification.addNotification({
			type: 'success',
			message: i18n.t('virtualMachine.save.' + (jsonModel.isCreate ? 'create' : 'update') + 'success')
		});
		var url = this.generateNavigationUrl();
		Backbone.history.navigate(url, true);
	},

	//Actions on save error
	saveError: function saveError(errors) {
		ErrorHelper.manageResponseErrors(errors, {
			model: this.model
		});
	},

	generateNavigationUrl: function generateNavigationUrl(){
		if(this.model.get('id') === null || this.model.get('id') === undefined){
			return "/";
		}
		return _url.generateUrl(["virtualMachine", this.model.get("id")], {});
	}, 

	cancelEdition: function cancelEdition() {
		var url = this.generateNavigationUrl();
		Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	},

	render: function renderEdit() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});