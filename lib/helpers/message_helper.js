/* global  _ , window, Promise,$, Backbone, i18n */

/**
 * @module helpers/message_helper
 * @description Message helper to deal wit confirm, alert, ...
 * @see file helpers/message_helper.js
 */

"use strict";
//Dependencies.
var ModalView =  require('../views/modal-view');
var isInitialize = false;

var ConfirmView = ModalView.extend({
    modalTitle: " ",
    customOptions: {
        isEdit: false
    },
    templateConsult: function(data) {
        return "" + data.message;
    },
    //configuration: _.extend({}, ModalView.prototype.configuration, {templateModal: });
});

//Create a Modal in the dom for containige the alert page.
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

/**
 * Helper to replace the confirm of JavaScript.
 * @param  {string} messageKey - internationalization key.
 * @param  {[type]} options    [description]
 * @return {[type]}            [description]
 */
var confirmFn = function messageHelperConfirm(messageKey, options) {
    options = options || {};
    //Save the initial opts;
    var initialOpts = confirmView.opts;
    _.extend(confirmView.opts, options);
    confirmView.modalTitle = messageKey;
    confirmView.model.set({
        'message': messageKey
    }, {
        silent: true
    });
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
    confirm: confirmFn,
    initialize: initialize
};
module.exports = messageHelper;