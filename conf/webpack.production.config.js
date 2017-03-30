const path = require('path');
const webpack = require('webpack');
const configurator = require('webpack-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssReporter = require('postcss-reporter');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

module.exports = new configurator.default().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  filename: __filename,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
          ],
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
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
        }),
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
    new ExtractTextPlugin({
      filename: "[name]-[contenthash].css",
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
});