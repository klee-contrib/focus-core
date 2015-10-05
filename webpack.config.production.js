const prodConfBuilder = require('webpack-focus').productionConfig;
const focusFileConf = require('./focus-core-webpack.config');
focusFileConf.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    backbone: 'Backbone',
    jquery: 'jQuery',
    moment: 'moment',
    numeral: 'numeral',
    'i18next-client': 'i18n'
};
const prodConf = prodConfBuilder(focusFileConf);
module.exports = prodConf;
