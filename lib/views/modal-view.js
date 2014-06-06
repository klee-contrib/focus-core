/*global   $, window,_*/
(function (NS) {
    "use strict";
    // Filename: views/modal-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var templateModal = isInBrowser ? NS.templates.modalSkeleton : function () { };
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    //var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
    var ModalView = ConsultEditView.extend({
        tagName: 'div',
        className: 'modalView',
        //Fefault options of the modal view.
        defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
            isModelToLoad: false, //By default the model is loaded.
            isEditMode: true,
            isEdit: true,
            isNavigationOnSave: false,
            isNavigationOnDelete: true,
            isSaveOnServer: false,
            isReadyModelData: true,
        }),
        modalTitle: "Modal title i18n key.",
        //Configuration of the modal.
        configuration: {
            templateModal: templateModal,
            container: "div[data-modal]",
            selector: "div[data-modal-content]",
            //Override the default modal options.
            modalOptions: {
                backdrop: 'static',
                keyboard: true,
                show: false,
                remote: false
            }
        },
        //Initialization of the modal.
        initialize: function initializeModalView(options) {
            options = options || {};
            ConsultEditView.prototype.initialize.call(this, options);
            //Modal title.
            this.opts.modalTitle = options.modalTitle || this.modalTitle;
            this.model.off('change');
            this.model.on('change', this.renderModalContent, this);
        },
        //Events listen by default on the modal.
        events: {
            "click button[data-dismiss]": "cancelModal",
            "click button[data-close]": "closeModal"
        },
        //Action call on cancel on the modal.
        cancelModal: function cancelModal() {
            //console.log('the modal is cancel');
            this.trigger('modal:cancel', { cancel: true });
        },
        saveSuccess: function saveSuccessModalClose(jsonModel) {
            var currentModal = this;
            $(this.configuration.container, this.$el).on('hidden.bs.modal', function () {
                currentModal.trigger('modal:close', jsonModel);
                $(currentModal.configuration.container, currentModal.$el).off('hidden.bs.modal');
            })
            this.hideModal();
            //console.log('the modal is close is successfull...');
        },
        //Action called on close the modale.
        closeModal: function closeModal(event) {
            event.preventDefault();
            //console.log('the modal is close is called...');
            if (utilHelper.isBackboneModel(this.model)) {
                this.saveModel();
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.saveCollection();
            }
        },
        //Render the modal container.
        renderModalContainer: function renderModalContainer() {
            this.$el.html(this.configuration.templateModal(this.getModalData()));
        },
        //Render the modal content.
        renderModalContent: function renderModalContent() {
            var templateName = this.isEdit ? 'templateEdit' : 'templateConsult';
            $(this.configuration.selector, this.$el).html(this[templateName](this.getRenderData()));
            $(this.configuration.selector, this.$el).modal(this.configuration.modalOptions);
            this.afterRender();
            this.delegateEvents();
        },
        getModalData: function () {
            return _.extend({
                title: this.opts.modalTitle,
            }, this.configuration.modalOptions);
        },
        showModal: function showModal() {
            
            //this.delegateEvents();
            this.model.unsetErrors();
            $(this.configuration.container, this.$el).modal('show');
        },
        hideModal: function hideModal() {
            $(this.configuration.container, this.$el).modal('hide');
        },
        //Render the modal view.
        render: function renderModalView(options) {
            options = options || {};
            this.renderModalContainer();
            this.renderModalContent();
            //this.delegateEvents();
        }
    });
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ModalView = ModalView;
    } else {
        module.exports = ModalView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);