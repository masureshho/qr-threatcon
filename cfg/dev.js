var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = require('./base');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({
  entry: [
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loaders: ['babel'],
  exclude: /node_modules/,
  include: path.join(__dirname, '/../src')
});

module.exports = config;
