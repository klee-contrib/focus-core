module.exports = {
    builtInStore: require('./built-in-store'),
    /**
     * Action builder
     */
    actionBuilder: require('./action-builder'),
    log() {
        let builtInStore = require('./built-in-store');
        console.info('---------------------------');
        console.info('QuickSearch', builtInStore.quickSearchStore.value);
        console.info('AdvancedSearch', builtInStore.advancedSearchStore.value);
        console.info('---------------------------');
    }
};
