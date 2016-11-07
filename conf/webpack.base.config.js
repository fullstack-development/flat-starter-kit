const path = require('path');
const webpack = require('webpack');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = new configurator.default().merge({
    entry: {
        app: [
            './src/entry.js'
        ],
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
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
        new HtmlWebpackPlugin({filename: 'index.html', template: './src/main.pug'}),
        new webpack.ProgressPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [
                    /node_modules/,
                    /jquery-ui.js/
                ],
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.styl/,
                use: [
                  {
                    loader: 'style',
                  },
                  {
                    loader: 'css',
                    options: {
                      modules: true,
                      importLoaders: 2,
                      sourceMap: true,
                      localIdentName: '[local]___[hash:base64:5]',
                    }
                  },
                  {
                    loader: 'autoprefixer',
                    options: {
                      browsers:'last 2 version',
                    }
                  },
                  {
                    loader: 'stylus',
                    options: {
                      sourceMap: true,
                      paths: [path.resolve(__dirname, '..', './src')]
                    }
                  },
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            }
        ]
    }
});