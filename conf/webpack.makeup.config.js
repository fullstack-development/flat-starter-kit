const path = require('path');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = new configurator.default()
  .extend({
    'conf/webpack.development.config.js': config => {
      config.plugins = config.plugins.filter((item) => {
        return !((item instanceof HtmlWebpackPlugin) || (item instanceof CleanPlugin))
      });
      config.plugins.unshift(
        new CleanPlugin(['./distTests'], { root: path.resolve(__dirname, '..') })
      );
      config.plugins.push(
        new HtmlWebpackPlugin({ alwaysWriteToDisk: true })
      );

      return config;
    }
  })
  .merge({
    entry: './src/entryMakeupTests.js',
    output: {
      path: path.resolve(__dirname, '..', 'distTests'),
    },
    devServer: {
      port: 8090,
      contentBase: 'distTests',
    },
  });
