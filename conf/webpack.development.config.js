const path = require('path');
const webpack = require('webpack');
const configurator = require('webpack-config');

const postcssReporter = require('postcss-reporter');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

module.exports = new configurator.default().extend('conf/webpack.base.config.js').merge({
  devtool: 'eval',
  output: {
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer({browsers: ['last 2 versions']}),
                ];
              },
            },
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              syntax: postcssSCSS,
              plugins: function () {
                return [
                  stylelint(),
                  doiuse({
                    browsers:['ie >= 11', 'last 2 versions'],
                    ignore: ['flexbox', 'rem', 'css-resize', 'css-masks', 'object-fit'],
                    ignoreFiles: ['**/normalize.css'],
                  }),
                  postcssReporter({
                    clearReportedMessages: true,
                    throwError: true,
                  }),
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: 'dist',
    host: '0.0.0.0',
  },
});