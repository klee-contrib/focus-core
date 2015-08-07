'use strict';

var dispatcher = require('../dispatcher');
module.exports = {
    builtInStore: require('./built-in-store'),
    /**
     * Action builder
     */
    actionBuilder: require('./action-builder'),
    log: function log() {
        var builtInStore = require('./built-in-store');
        console.info('---------------------------');
        console.info('QuickSearch', builtInStore.quickSearchStore.value);
        console.info('AdvancedSearch', builtInStore.advancedSearchStore.value);
        console.info('---------------------------');
    }
};