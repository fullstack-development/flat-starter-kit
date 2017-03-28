const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const configurator = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const postcssReporter = require('postcss-reporter');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

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
  filename: `${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
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
            }
          },
        ]
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
  devServer: {
    inline: true,
    hot: true,
    contentBase: 'dist'
  }
});