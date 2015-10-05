const prodConfBuilder = require('webpack-focus').productionConfig;
const focusCoreConf = require('./focus-core-webpack.config');
focusCoreConf.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    backbone: 'Backbone',
    jquery: 'jQuery',
    moment: 'moment',
    numeral: 'numeral',
    'i18next-client': 'i18n'
};
const prodConf = prodConfBuilder(focusCoreConf);
console.log(prodConf.externals);
module.exports = prodConf;
