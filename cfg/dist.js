var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./base');

// Add needed plugins here
var config = _.merge({
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  port: 8080,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ],
}, baseConfig);

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  query: {
    presets:['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy']
  },
  include: path.join(__dirname, '/../src')
});

module.exports = config;
