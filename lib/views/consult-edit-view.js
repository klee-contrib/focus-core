/*global window, Backbone, $, i18n, _*/
(function(NS) {
    "use strict";
    //Filename: views/consult-edit-view.js
    NS = NS || {};

    //Dependencies.
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var urlHelper = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require("../helpers/custom_exception").NotImplementedException;
    var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("../helpers/custom_exception").ArgumentNullException;

    //Backbone view which can be use in order to create consultation view and edition view.
    var ConsultEditView = CoreView.extend({

        //The default tag for this view is a div.
        tagName: 'div',

        //The default class for this view.
        className: 'consultEditView',

        // Service to initialize the model
        getNewModelSvc: undefined,

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
        additionalData: function() {
            return undefined;
        },
        /**
         * Default options of the view. These options can be overriden by using customOptions property of the view.
         * In order to access this options, the view has a property called `this.opts`.
         * @type {[type]}
         */
        defaultOptions: _.extend({}, CoreView.prototype.defaultOptions, {
            /**
             * Does the view has to load the model from the service define in `getModelSvc`.
             * @type {Boolean}
             */
            isModelToLoad: true, //By default the model is loaded.
            /**
             * If true, there is  an edit mode in the view.
             * @type {Boolean}
             */
            isEditMode: true,
            /**
             * If there is an edit mode and this property is true, the view can start in edit mode. The templateEdit will be rendered.
             * @type {Boolean}
             */
            isEdit: false,
            /**
             * If true, the view will navigate to the `generateNavigationUrl` url.
             * @type {Boolean}
             */
            isNavigationOnSave: true,
            /**
             * If true, the view will navigate to the `generateDeleteUrl` url.
             * @type {Boolean}
             */
            isNavigationOnDelete: true,
            /**
             * If true, the view will attempt to call the `saveModelSvc` in the `saveAction` when there is a submit.
             * If you have a composite or a list view, maybe you want the parent view to deal with the save.
             * @type {Boolean}
             */
            isSaveOnServer: true,
            /**
             * When the view is a list view, this selector is use to identify the view of each line.
             * It could be `ul li`.
             * @type {String}
             */
            collectionSelector: "tbody tr",
            /**
             * If there is no navigatio on save, and dhis parameter is true, the view attempt to reload the page (using Backbone not the naigator refresh).
             * @type {Boolean}
             */
            isForceReload: false,
            /**
             * This parameter is use in order to know if the view is ready to be displayed.
             * If not, the spinner is render (see isReady function).
             * @type {Boolean}
             */
            isReadyModelData: true,
            /**
             * This parameter can be use in order to have a back to the list button.
             * @type {string}
             */
            listUrl: undefined,
            /**
             * If true, the view will listen to the `model:change` event.
             * @type {Boolean}
             */
            isListeningToModelChange: true,
            /**
             * If you need to specify a selector in which the input, select, textarea are searched.
             * @type {string}
             */
            formSelector: undefined, //In whitch selector you have to search the form datas (inputs, select,...).,
            /**
             * Define if the type of model of the view is a model or a collection.
             * @type {String}
             */
            modelType: "model"
        }),

        /**
         * Initialize the consult edit view.
         * @param  {object} options - All options you need to pass to the view.
         * These will extend the defaultOptions and customOptions of the view.
         * All options will be in the `opts` property of the view.
         * @return {undefined}
         */
        initialize: function initializeConsultEdit(options) {
            options = options || {};
            //Call the parent initialize.
            CoreView.prototype.initialize.call(this, options);

            //By default the view is in consultationmode and if edit mode is active and isEdit has been activated in th options. 
            this.isEdit = (this.opts.isEditMode && this.opts.isEdit) || false;

            //Transform the listUrl
            if (this.opts.listUrl) {
                var currentView = this;
                this.opts.listUrl = this.opts.listUrl.replace(/\:(\w+)/g, function(match) {
                    return currentView.opts[match.replace(":", "")];
                });
            }

            if (this.model) {
                if (this.isCreateMode(options)) {
                    this.isEdit = true;
                    this.opts.isModelToLoad = false;
                    this.loadGetNewModelData();
                }

                //render view when the model is loaded
                if (this.opts.isListeningToModelChange) {
                    this.model.on('change', this.render, this);
                }

                // In order to be loaded a model has to have an id and the options must be activated.
                if (this.opts.isModelToLoad && utilHelper.isBackboneModel(this.model)) {
                    this.opts.isReadyModelData = false;
                    //Try to load the model from a service which have to return a promise.
                    this.loadModelData();
                }
            }
        },
        // returns true if the view should be rendered in creation mode.
        /**
         * Function wich process the fact that the view is in create.
         * @param  {object}  options [description]
         * @return {Boolean}  - true if the view is in create mode.
         */
        isCreateMode: function isCreateModeConsultEdit(options) {
            var isBackboneModel = utilHelper.isBackboneModel(this.model);
            return this.opts.isCreateMode || (isBackboneModel && this.opts.isModelToLoad && this.model.get('isNewModel'));
        },
        /**
         * Get the object to serve to the getModelSvc.
         * @param  {string} id - Identifier of the model.
         * @return {string | object}- The criteria to give to the load service.
         */
        getLoadCriteria: function getLoadCriteria(id) {
            return id || this.model.get('id');
        },
        //This function is use in order to retrieve the data from the api using a service.
        /**
         * Load the model from the gerModelSvc function which should be a Promise.
         * @param  {string} id - model identifier.
         * @return {undefined}
         */
        loadModelData: function loadModelData(id) {
            if (!this.getModelSvc) {
                throw new ArgumentNullException('The getModelSvc should be a service which returns a promise, it is undefined here.', this);
            }
            var view = this;
            var loadCriteria = this.getLoadCriteria();
            this.getModelSvc(loadCriteria)
                .then(function successLoadModel(jsonModel) {
                    view.opts.isReadyModelData = true;
                    if (jsonModel === undefined) {
                        //manually trigger the change event in the case of empty object returned.
                        view.model.trigger('change');
                    } else {
                        view.model.set(jsonModel); //change and change:property
                    }

                }, function errorLoadModel(errorResponse) {
                    errorHelper.manageResponseErrors(errorResponse, {
                        model: view.model
                    });
                });
        },

        //This function is use in order to retrieve the data from the api using a service.
        loadGetNewModelData: function loadGetNewModelData() {
            if (this.getNewModelSvc !== undefined) {
                var view = this;
                this.getNewModelSvc()
                    .then(function success(jsonModel) {
                        view.opts.isReadyModelData = true;
                        view.model.set(jsonModel);
                        //view.model.savePrevious();
                    }).then(null, function error(errorResponse) {
                        errorHelper.manageResponseErrors(errorResponse, {
                            model: view.model
                        });
                    });
            }
        },

        //Events handle by the view with user interaction
        events: {
            // Deals with the edit button click.
            "click button.btnEdit": "edit",
            // Deals with the delete button.
            "click button.btnDelete": "deleteItem",
            // Deals with the panel collapse event.
            "click .panel-heading": "toogleCollapse",
            // Deals with the submit button.
            "click button[type='submit']": "save",
            // Deals withe the candel button.
            "click button.btnCancel": "cancelEdition",
            // Deals with the button back.
            "click button.btnBack": "back",
            // Deals with the data-loading button event.
            "click button[data-loading]": "loadLoadingButton"
        },

        /**
         * This function represents the data given to to template on the rendering.
         * @return {object} The json to give to the template.
         */
        getRenderData: function getRenderDataConsultEdit() {

            var jsonToRender = this.model.toJSON();

            //Add the reference lists names to the json.
            if (this.model.references) {
                _.extend(jsonToRender,this.model.references);
            }
            //If there is a listUrl it is added to the 
            if (this.opts.listUrl) {
                jsonToRender.listUrl = this.opts.listUrl;
            }
            //Add the additionalData to the rendering of the template.
            _.extend(jsonToRender, this.additionalData());

            return jsonToRender;
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
            if (this.isEdit) {
                backboneNotification.clearNotifications();
                this.model.savePrevious();
            }
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
        //Get the json data to be save by the view.
        getDataToSave: function getDataToSaveDetailEdit() {
            return this.model.toSaveJSON();
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
            this.bindToModel();
            //Bind the this to the current view for the
            var currentView = this;
            ModelValidator.validateAll(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.forEach(function(mdl) {
                        mdl.unsetErrors();
                    }, currentView);
                    if (currentView.opts.isSaveOnServer) {
                        currentView.saveAction();
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
            this.changeButtonState('button[type="submit"]', 'reset');
            //$('button[type="submit"]', this.$el).button('reset');
        },
        resetLoadingButton: function resetLoadingButton() {
            $('button[data-loading]', this.$el).button('reset');
        },
        loadLoadingButton: function loadLoadingButton(event) {
            $(event.target).closest('button[data-loading]').button('loading');
        },
        /**
         * Bind the html to the backbone model or collection..
         * @return {[type]} [description]
         */
        bindToModel: function bindToModelConsultEdit() {
            var formSelector = this.opts.formSelector || "";
            if (utilHelper.isBackboneModel(this.model)) {
                this.model.unsetErrors({
                    silent: true
                });
                var inputSelector = formSelector + " " + "input, " + formSelector + " " + "textarea";
                var selectSelector = formSelector + " " + "select";
                form_helper.formModelBinder({
                    inputs: $(inputSelector, this.$el),
                    options: $(selectSelector, this.$el)
                }, this.model);
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.model.unsetErrors({
                    silent: true
                });
                var collectionSelector = formSelector + " " + this.opts.collectionSelector;
                form_helper.formCollectionBinder(
                    $(collectionSelector, this.$el),
                    this.model, {
                        isSilent: false
                    }
                );
            }
        },
        //Save method in case of a model.
        saveModel: function saveBackboneModel() {
            this.bindToModel();
            //Bind the this to the current view for the
            var currentView = this;
            //Todo: Add a method in util in order to know if an object is a collectio or a model.
            //Add it into the initialize too.
            ModelValidator.validate(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.unsetErrors();
                    if (currentView.opts.isSaveOnServer) {
                        currentView.saveAction();
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    currentView.model.setErrors(errors);
                    currentView.resetSaveButton();
                });
        },
        //Save action call the save Svc.
        saveAction: function saveActionConsultEdit() {
            var currentView = this;
            //Add a control on the property saveModelSvc.
            if (!currentView.saveModelSvc) {
                throw new ArgumentNullException("'The saveModeSvc should be a service which returns a promise, it is undefined here.");
            }
            //Call the service in order to save the model.
            return currentView.saveModelSvc(currentView.getDataToSave())
                .then(function success(jsonModel) {
                    currentView.saveSuccess(jsonModel);
                }, function error(responseError) {
                    currentView.saveError(responseError);
                })
                .then(currentView.resetSaveButton.bind(currentView));
        },
        //Actions on save error
        saveError: function saveErrorConsultEdit(errors) {
            errorHelper.manageResponseErrors(errors, {
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
                if (this.opts.isForceReload === true) {
                    var thisUrl = this.generateReloadUrl(jsonModel);
                    if (!Backbone.history.navigate(thisUrl, true)) {
                        Backbone.history.loadUrl(thisUrl);
                    }
                } else if (jsonModel instanceof Object) {
                    //Render the success notification.
                    backboneNotification.renderNotifications();
                    //Reset the model or the collection.
                    this.model[utilHelper.isBackboneModel(this.model) ? 'set' : 'reset'](jsonModel, {
                        silent: false
                    });
                    this.toggleEditMode();
                } else if (utilHelper.isBackboneModel(this.model) && this.model.isNew()) {
                    Backbone.history.navigate(Backbone.history.fragment.replace('new', jsonModel), true);
                } else {
                    backboneNotification.renderNotifications();
                    //Reload the model from the service.
                    this.loadModelData();
                    this.toggleEditMode();
                }

            }
        },
        //Contains all the business validation promises.
        businessValidationPromises: function() {
            //Return an array of  promises
            return [];
        },
        //Cancel the edition.
        cancelEdition: function cancelEditionConsultEditView() {
            backboneNotification.clearNotifications();
            if (this.model.isNew()) {
                Backbone.history.navigate(this.opts.listUrl, true);
            } else {
                this.model.restorePrevious();
                this.toggleEditMode();
            }
        },
        //Url to generate when you want to reload the page, if the option isForceReload is activated.
        generateReloadUrl: function generateReloadUrl(param) {
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
            if (!this.deleteModelSvc) {
                throw new ArgumentNullException('The deleteModelSvc should be a service which returns a promise, it is undefined here.', this);
            }
            this.deleteModelSvc(this.model)
                .then(function success(successResponse) {
                    view.deleteSuccess(successResponse);
                }, function error(errorResponse) {
                    view.deleteError(errorResponse);
                });
        },

        //Generate delete navigation url.
        generateDeleteUrl: function generateDeleteUrl() {
            return this.opts.listUrl;
        },

        // Actions after a delete success.
        deleteSuccess: function deleteConsultEditSuccess(response) {
            //remove the view from the DOM
            if (this.model.isInCollection()) {
                this.model.collection.remove(this.model);
            } else {
                delete this.model;
            }
            this.remove();
            this.resetLoadingButton();
            if (this.opts.isNavigationOnDelete) {
                //navigate to next page
                Backbone.history.navigate(this.generateDeleteUrl(), true);
            }

        },

        // Actions after a delete error. 
        deleteError: function deleteConsultEditError(errorResponse) {
            errorHelper.manageResponseErrors(errorResponse, {
                isDisplay: true
            });
            this.resetLoadingButton();
        },
        //Render function.
        render: function renderConsultEditView() {
            //todo: see if a getRenderData different from each mode is necessary or it coul be deal inside the getRenderDatatFunction if needed.
            var templateName = this.isEdit ? 'templateEdit' : 'templateConsult';
            if(!this[templateName] || !_.isFunction(this[templateName])){
                throw new ArgumentNullException('The template for ' + templateName + 'is not defined.');
            }
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
        //Inform if the view is ready to be displayed.
        isReady: function isReadyConsultEditView() {
            return this.opts.isReadyModelData === true && CoreView.prototype.isReady.call(this) === true;
        },
        //Function which is called after the render, usally necessary for jQuery plugins.
        afterRender: function postRenderDetailView() {
            CoreView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
            //Button loading:
            $('button[data-loading]').button();

            var errorField = $('input', 'div.form-group.has-error', this.$el)[0];
            if (errorField === undefined) {
                errorField = $('select', 'div.form-group.has-error', this.$el)[0];
            }
            if (errorField !== undefined) {
                errorField.focus();
            }
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