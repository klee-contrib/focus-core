const configBuilder = require('webpack-focus').configBuilder;
const customConfig = {
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        jquery: 'jQuery',
        backbone: 'Backbone',
        numeral: 'numeral',
        'i18next-client': 'i18n'
    }
};

module.exports = configBuilder(customConfig);
