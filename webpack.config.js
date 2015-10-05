const devConfBuilder = require('webpack-focus').devConfig;
const focusComponentsConf = require('./focus-core.webpack.config');
const devConf = devConfBuilder(focusComponentsConf);
module.exports = devConf;
