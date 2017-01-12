const path = require('path');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = new configurator.default()
  .extend({
    'conf/webpack.development.config.js': config => {
      config.plugins = config.plugins.filter((item) => {
        return !(item instanceof HtmlWebpackPlugin)
      });
      config.plugins.concat([
        new HtmlWebpackPlugin({ alwaysWriteToDisk: true }),
        new CleanPlugin(['./distTest'], { root: path.resolve(__dirname, '..') }),
      ]);

      return config;
    }
  })
  .merge({
    entry: './src/entryMakeupTests.js',
    output: {
      path: path.resolve(__dirname, '..', 'distTests'),
    },
    devServer: {
      contentBase: 'distTests'
    },
  });
