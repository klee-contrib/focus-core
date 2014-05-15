/*global window, Backbone, $, i18n*/
(function (NS) {
    "use strict";
    //Filename: views/consult-edit-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var urlHelper = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require("../helpers/custom_exception").NotImplementedException;

    //Backbone view which can be use in order to create consultation view and edition view.
    var ConsultEditView = CoreView.extend({

        //The default tag for this view is a div.
        tagName: 'div',

        //The default class for this view.
        className: 'consultEditView',

        //Service to get the model.
        getModelSvc: undefined,

        //Service to delete the model.
        deleteModelSvc: undefined,

        //Service to save a model wether it is a model or a collection.
        saveModelSvc: undefined,

        //Template for the edit mode.
        templateEdit: undefined,

        //Template for the consultation mode.
        templateConsult: undefined,

        //Additional data to pass to the template.
        additionalData: function () {
            return undefined;
        },

        //Default options for the view.
        defaultOptions: {
            isModelToLoad: true, //By default the model is loaded.
            isEditMode: true,
            isNavigationOnSave: true,
            isNavigationOnDelete: true,
            isSaveOnServer: true,
            collectionSelector: "tbody tr",
            isForceReload: false
        },

        //Initialize function
        initialize: function initializeConsultEdit(options) {
            options = options || {};
            CoreView.prototype.initialize.call(this, options);
            //By default the view is in consultationmode and if edit mode is active and isEdit has been activated in th options. 
            this.isEdit = (this.opts.isEditMode && this.opts.isEdit) || false;
            if (this.model) {
                //render view when the model is loaded
                this.model.on('change', this.render, this);
            }
            // In order to be loaded a model has to have an id and the options must be activated.
            if (this.opts.isModelToLoad && typeof this.model.has === "function" && this.model.has('id')) {
                //Try to load the model from a service which have to return a promise.
                this.loadModelData()
            }
        },

        loadModelData: function loadModelData() {
            var view = this;
            this.getModelSvc(this.model.get('id'))
                .then(function success(jsonModel) {
                    view.model.set(jsonModel);
                }).then(null, function error(errorResponse) {
                    ErrorHelper.manageResponseErrors(errorResponse, {
                        model: view.model
                    });
                });
        },

        //Events handle by the view with user interaction
        events: {
            "click button.btnEdit": "edit",
            "click button.btnDelete": "deleteItem",
            "click .panel-heading": "toogleCollapse",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition",
            "click button.btnBack": "back"
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
            if (event) {
                event.preventDefault();
            }
            this.isEdit = !this.isEdit;
            this.render({
                isSearchTriggered: true
            }); //todo: fix this to have no options.
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
        //Get the json data to be save by the view.
        getDataToSave: function getDataToSaveDetailEdit() {
            if (utilHelper.isBackboneModel(this.model)) {
                return this.model.toJSON();
            } else {
                return this.model.toSaveJSON();
            }
        },
        //Deal with the save event on the page.
        save: function saveConsultEdit(event) {
            event.preventDefault();
            //Call a different method depending on the fact that the model is a collection or a model.
            if (utilHelper.isBackboneModel(this.model)) {
                this.saveModel();
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.saveCollection();
            }

        },
        //Save a backbone collection.
        saveCollection: function saveBackboneCollection() {
            //Call the form helper in order to rebuild the collection from the form.
            form_helper.formCollectionBinder(
                $(this.opts.collectionSelector, this.$el),
                this.model, { isSilent: false }
            );
            //Bind the this to the current view for the
            var currentView = this;
            ModelValidator.validateAll(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.forEach(function (mdl) {
                        mdl.unsetErrors();
                    }, currentView);
                    if (currentView.opts.isSaveOnServer) {
                        //Call the service in order to save the model.                   
                        currentView.saveModelSvc(currentView.getDataToSave())
                            .then(function success(jsonModel) {
                                currentView.saveSuccess(jsonModel);
                            }, function error(responseError) {
                                currentView.saveError(responseError);
                            })
                            .then(currentView.resetSaveButton);
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    //todo: see how to set errors.
                    errorHelper.setCollectionErrors(currentView.model, errors);
                    currentView.resetSaveButton();
                });
        },
        resetSaveButton: function resetSaveButton() {
            $('button[type="submit"]', this.$el).button('reset');
        },
        //Save method in case of a model.
        saveModel: function saveBackboneModel() {
            //Call the form helper in order to rebuild the model from the form.
            form_helper.formModelBinder({
                inputs: $('input', this.$el),
                options: $('select', this.$el)
            }, this.model);

            //Bind the this to the current view for the
            var currentView = this;
            //Todo: Add a method in util in order to know if an object is a collectio or a model.
            //Add it into the initialize too.
            ModelValidator.validate(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.unsetErrors();
                    if (currentView.opts.isSaveOnServer) {
                        //Call the service in order to save the model.                   
                        currentView.saveModelSvc(currentView.getDataToSave())
                            .then(function success(jsonModel) {
                                currentView.saveSuccess(jsonModel); //.bind(currentView);
                            }, function error(responseError) {
                                currentView.saveError(responseError); //.bind(currentView);
                            });
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    currentView.model.setErrors(errors);
                });
        },

        //Actions on save error
        saveError: function saveErrorConsultEdit(errors) {
            ErrorHelper.manageResponseErrors(errors, {
                model: this.model
            });
        },
        //Actions on save success.
        saveSuccess: function saveSuccessConsultEdit(jsonModel) {
            this.opts.isNewModel = false;
            //Add a notification which will be displayed wether by the router or by the same view.
            backboneNotification.addNotification({
                type: 'success',
                message: i18n.t('save.' + (jsonModel && jsonModel.id ? 'create' : 'update') + 'success')
            });
            // If the navigation on save is activated, navigate to the page.
            if (this.opts.isNavigationOnSave) {
                Backbone.history.navigate(this.generateNavigationUrl(), true);
            } else {
                // If there is no navigation on save, trigger a change event.
                if(this.opts.isForceReload === true){
                    var thisUrl = this.generateReloadUrl(jsonModel);
                    if (!Backbone.history.navigate(thisUrl, true)) {
                        Backbone.history.loadUrl(thisUrl);
                    }
                }
                else if (jsonModel instanceof Object) {
                    //Render the success notification.
                    backboneNotification.renderNotifications();
                    //Reset the model or the collection.
                    this.model[utilHelper.isBackboneModel(this.model) ? 'set' : 'reset'](jsonModel, {
                        silent: false
                    });
                    this.toggleEditMode();
                } else {
                    backboneNotification.renderNotifications();
                    //Reload the model from the service.
                    this.loadModelData();
                    this.toggleEditMode();
                }
                
            }
        },
        //Cancel the edition.
        cancelEdition: function cancelEditioConsultEditView() {
            this.toggleEditMode();
        },
        //Url to generate when you want to reload the page, if the option isForceReload is activated.
        generateReloadUrl: function generateReloadUrl(param){
            throw new NotImplementedException('generateReloadUrl', this);
        },
        //Url for the newt page after success if the option isNavigateOnSave is activated.
        generateNavigationUrl: function generateNavigationUrl() {
            if (this.model.get('id') === null || this.model.get('id') === undefined) {
                return "/";
            }
            return urlHelper.generateUrl([this.model.modelName, this.model.get("id")], {});
        },

        //Code to delete an item.
        deleteItem: function deleteConsult(event) {
            event.preventDefault();
            var view = this;
            //call delete service
            this.deleteModelSvc()
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
            this.model.destroy();
            this.remove();
            if (this.opts.isNavigationOnDelete) {
                //navigate to next page
                Backbone.history.navigate(this.generateDeleteUrl(), true);
            }

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
            var templateName = this.isEdit ? 'templateEdit' : 'templateConsult';
            if (this.opts.isElementRedefinition) {
                this.setElement(this[templateName](this.getRenderData()));
            } else {
                this.$el.html(this[templateName](this.getRenderData()));
            }

            //if (this.isEdit) {
            //    this.$el.html(this.templateEdit(this.getRenderData()));
            //} else {
            //    this.$el.html(this.templateConsult(this.getRenderData()));
            //}

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