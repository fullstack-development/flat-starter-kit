const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const configurator = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const pages = [];

fs
  .readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
  .filter((file) => {
    return file.indexOf('base') !== 0;
  })
  .forEach((file) => {
    pages.push(file.split('/', 2));
  });

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  getData: () => {
    try {
      return JSON.parse(fs.readFileSync(`./src/pages/${fileName}/data.json`, 'utf8'));
    } catch (e) {
      console.warn(`data.json was not provided for page ${fileName}`);
      return {};
    }
  },
  filename: `${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
  inject: 'body',
  hash: true,
}));

module.exports = new configurator.default().merge({
  entry: './src/entry.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/static/'
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new CleanPlugin(['./dist'], { root: path.resolve(__dirname, '..') }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new FaviconsWebpackPlugin('./src/theme/favicon.png'),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ].concat(htmlPlugins),
});