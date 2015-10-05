const path = require('path');
module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'focus-core.js',
        publicPath: '/dist/',
        libraryTarget: 'var',
        library: 'FocusCore'
    },
    directory: path.join(__dirname, 'src'),
    port: 3001
};
