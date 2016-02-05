const configBuilder = require('webpack-focus').configBuilder;
const customConfig = {
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        jquery: 'jQuery',
        backbone: 'Backbone',
        numeral: 'numeral'
    }
};

module.exports = configBuilder(customConfig);
