const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const pages = [
  'arrow-button',
];

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  name: fileName,
  filename: `${fileName}.html`,
  template: `./src/testTemplate.pug`,
  alwaysWriteToDisk: true,
}));

module.exports = new configurator.default().merge({
  entry: {
    main: './src/entryTests.js',
    globals: './src/testGlobals.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'distTests'),
    publicPath: '/static/'
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      data: {
        'arrow-button': 'components/arrow-button/__tests__/makeup-data'
      },
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/components/'),
        glob: '**/*.png',
      },
      target: {
        image: path.resolve(__dirname, '../src/theme/sprite-generated/sprite.png'),
        css: path.resolve(__dirname, '../src/theme/sprite-generated/sprite.styl'),
      },
      apiOptions: {
        cssImageRef: "~theme/sprite-generated/sprite.png"
      }
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
        test: /\.styl/,
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
          {
            loader: 'autoprefixer-loader',
            options: {
              browsers: 'last 2 version',
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: [path.resolve(__dirname, '..', 'src')],
              import: [
                // make this files global, so all styl files will be visible without includes
                path.resolve(__dirname, '../src/theme/variables.styl'),
              ]
            }
          },
        ]
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
  node: {
    fs: 'empty',
  },
  devServer: {
    inline: true,
    hot: true,
    contentBase: 'distTests'
  }
});