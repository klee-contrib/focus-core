/*global Backbone, $, i18n, window*/
(function(NS) {
	//Filename: views/detail-edit-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
	var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
	var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
	var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require("../helpers/custom_exception").NotImplementedException;
	var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');

	var DetailEditView = CoreView.extend({
		tagName: 'div',
		className: 'editView',
		saveModel: undefined, //VmSvc.save
		getModel: undefined, //VmSvc.get

		initialize: function initializeEdit(options) {
			options = options || {};
			CoreView.prototype.initialize.call(this, options);
			this.model.on('change', this.render, this);
			this.listenTo(this.model, 'validated:valid', this.modelValid);
			this.listenTo(this.model, 'validated:invalid', this.modelInValid);
			if (this.model.has('id')) {
				var view = this;
				this.getModel(this.model.get('id'))
					.then(function success(jsonModel) {
						view.model.set(jsonModel);
					});
			}
		},

		events: {
			"click button[type='submit']": "save",
			"click button#btnCancel": "cancelEdition"
		},

		//JSON data to attach to the template.
		getRenderData: function getRenderDataEdit() {
			throw new NotImplementedException('getRenderData');
		},

		//Get the json data to be save by the view.
		getDataToSave: function getDataToSaveDetailEdit() {
			return this.model.toJSON();
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
					currentView.saveModel(currentView.getDataToSave())
						.then(function success(jsonModel) {
							currentView.saveSuccess(jsonModel);
						}).then(null, function error(responseError) {
							currentView.saveError(responseError);
						});
				}).then(null, function error(errors) {
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

		generateNavigationUrl: function generateNavigationUrl() {
			if (this.model.get('id') === null || this.model.get('id') === undefined) {
				return "/";
			}
			return _url.generateUrl([this.model.modelName, this.model.get("id")], {});
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

	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.DetailEditView = DetailEditView;
	} else {
		module.exports = DetailEditView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);