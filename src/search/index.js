import actionBuilder from './action-builder'
import builtInStore, {quickSearchStore, advancedSearchStore} from './built-in-store'

function log() {
    console.info('---------------------------');
    console.info('QuickSearch', quickSearchStore.value);
    console.info('AdvancedSearch', advancedSearchStore.value);
    console.info('---------------------------');

}

export {
    builtInStore,
    actionBuilder,
    log
}

export default {
    builtInStore,
    actionBuilder,
    log
}