const path = require('path');
const webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'FocusCore.js',
    publicPath: '/dist/',
    libraryTarget: 'var',
    library: 'FocusCore'
   },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
  }, {
      test: /\.json$/,
      loaders: ['json']
  }]
  }
};
