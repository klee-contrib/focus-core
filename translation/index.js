import i18next from 'i18next';

const init = i18next.init.bind(i18next);
const translate = i18next.t.bind(i18next);

function focusi18nInit(data) {
    const { resStore, ...others } = data || {};
    const toInit = { ...others };
    if (resStore) {
        console.warn('With new i18next version, data should be in resources, not in resStore. Please change it in the initializer.');
        toInit.resources = resStore;
    }
    return init(toInit);
}


export {
    focusi18nInit as init,
    translate
};
export default {
    init: focusi18nInit,
    translate
};