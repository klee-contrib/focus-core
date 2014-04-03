/*global window, Backbone, $*/
"use strict";
(function (NS) {
    //Filename: views/detail-consult-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');

    //Backbone view which can be use in order to create consultation view and edition view.
    var ConsultEditView = CoreView.extend({

        //The default tag for this view is a div.
        tagName: 'div',

        //The default class for this view.
        className: 'consultEditView',

        //Service to get the model.
        getModel: undefined,

        //Service to delete the model.
        deleteModel: undefined,

        //Template for the edit mode.
        templateEdit: undefined,

        //Template for the consultation mode.
        templateConsult: undefined,

        //Default options for the view.
        defaultOptions: {
            isModelLoaded: true, //By default the model is loaded.
            isEditMode: true
        },

        //Initialize function
        initialize: function initializeConsultEdit(options) {
          options = options || {};
          CoreView.prototype.initialize.call(this);
          //By default the view is in consultationmode and if edit mode is active and isEdit has been activated in th options. 
          this.isEdit = (this.opts.isEditMode && this.opts.isEdit)|| false;
          //render view when the model is loaded
          this.model.on('change', this.render, this);
          // In order to be loaded a model has to have an id and the options must be activated.
          if (this.opts.isModelLoaded && this.model.has('id')) {
            //Try to load the model from a service which have to return a promise.
            var view = this;
            this.getModel(this.model.get('id'))
				.then(function success(jsonModel) {
					view.model.set(jsonModel);
				}).then(null, function error(errorResponse) {
				    ErrorHelper.manageResponseErrors(errors, {
				        model: this.model
				    });
				});
          }
        },

        //Events handle by the view with user interaction
        events: {
            "click button.btnEdit": "edit",
            "click button.btnDelete": "deleteItem",
            "click .panel-heading": "toogleCollapse"
        },

        //JSON data to attach to the template.
        getRenderData: function getRenderDataConsultEdit() {
           return this.model.toJSON();
        },

        //genarate navigation url usefull if the edit mode is not on the same page.
        generateEditUrl: function generateEditUrl() {
            return this.model.modelName + "/edit/" + this.model.get('id');
        },

        //Change the edit mode.
        toggleEditMode: function toogleEditMode(event) {
            if (event) { event.preventDefault(); }
            this.isEdit = !this.isEdit;
            this.render();
        },

        //Deal with the edit button click wether there is an edit mode or not.
        edit: function editConsultEditView(event) {
            event.preventDefault();
            if (this.opts.isEditMode) {
                this.toggleEditMode();
            } else {
                Backbone.history.navigate(this.generateEditUrl(), true);
            }
        },

        //Code to delete an item.
        deleteItem: function deleteConsult(event) {
            event.preventDefault();
            var view = this;
            //call delete service
            this.deleteModel()
				.then(function success(successResponse) {
				    view.deleteSuccess(successResponse);
				}, function error(errorResponse) {
				    view.deleteError(errorResponse);
				});
        },

        //Generate delete navigation url.
        generateDeleteUrl: function generateDeleteUrl() {
            return "/";
        },

        // Actions after a delete success.
        deleteSuccess: function deleteConsultEditSuccess(response) {
            //remove the view from the DOM
            this.remove();
            //navigate to next page
            Backbone.history.navigate(this.generateDeleteUrl(), true);
        },

        // Actions after a delete error. 
        deleteError: function deleteConsultEditError(errorResponse) {
            ErrorHelper.manageResponseErrors(errorResponse, {
                isDisplay: true
            });
        },
        //Render function.
        render: function renderConsultEditView() {
            //todo: see if a getRenderData different from each mode is necessary or it coul be deal inside the getRenderDatatFunction if needed.
            if (this.isEdit) {
                this.$el.html(this.templateEdit(this.getRenderData()));
            } else {
                this.$el.html(this.templateConsult(this.getRenderData()));
            }
            
            return this;
        },

        //Function which is called after the render, usally necessary for jQuery plugins.
        afterRender: function postRenderDetailView() {
            CoreView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        }
    });


    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ConsultEditView = ConsultEditView;
    } else {
        module.exports = ConsultEditView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);