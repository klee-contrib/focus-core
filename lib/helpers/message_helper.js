/* global  _ , window, Promise */
(function (NS) {
    "use strict";
    //Filename: helpers/message_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

    var confirm = function messageHelperConfirm(messageKey) {
        if (isInBrowser) {
            // TODO : implement another confirm method (currently we are using native javascript confirm function)
            return window.confirm(i18n.t(messageKey));
        }
        return false;
    };

    //Message helper.
    var messageHelper = {
        confirm: confirm
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.messageHelper = messageHelper;
    } else {
        module.exports = messageHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);