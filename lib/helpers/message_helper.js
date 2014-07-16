/* global  _ , window, Promise,$, Backbone */
(function(NS) {
    "use strict";
    //Filename: helpers/message_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //create a modal in the DOM.
    var ModalView = isInBrowser ? NS.Views.ModalView : require('../views/modal-view');

    var isInitialize = false;
    var ConfirmView = ModalView.extend({
        modalTitle: " ",
        customOptions: {isEdit: false},
        templateConsult: function(data) {
            return ""+ data.message;
        },
        //configuration: _.extend({}, ModalView.prototype.configuration, {templateModal: });
    });
    var confirmView = new ConfirmView({
        modelName: "confirmModel",
        isButtonLabelRedefinition: false
    });
    //if (!$('div[data-modal-confirm]').length) {
    //Register the modal in the DOM.
    function initialize() {
        $('div#modalConfirmContainer').append(confirmView.render().el);
        isInitialize = true;
    }

    //Create an event manager.
    var eventManager = _.extend({}, Backbone.Events);

    //Confirm promise version.
    var confirm = function messageHelperConfirm(messageKey, options) {
        options = options || {};
        //Save the initial opts;
        var initialOpts = confirmView.opts;
        _.extend(confirmView.opts, options);
        confirmView.modalTitle = messageKey;
        confirmView.model.set({'message': messageKey},{silent: true});
        confirmView.render();
        return new Promise(function(resolve, reject) {
            confirmView.showModal();
            //Listen to once to the close event of the modal.
            eventManager.listenToOnce(confirmView, "modal:close", function(data) {
                eventManager.stopListening(confirmView, 'modal:cancel');
                confirmView.opts = initialOpts;
                resolve(messageKey);
            });
            //Listen to once the cancel event on the modal.
            eventManager.listenToOnce(confirmView, "modal:cancel", function(data) {
                eventManager.stopListening(confirmView, 'modal:close');
                confirmView.opts = initialOpts;
                reject(options.cancelMessageKey || {
                    responseJSON: {
                        "error": i18n.t("error.operationCancelled")
                    }
                });
            });
        });
        
    };

    //Message helper.
    var messageHelper = {
        confirm: confirm,
        initialize: initialize
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.messageHelper = messageHelper;
    } else {
        module.exports = messageHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);