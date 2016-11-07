const path = require('path');
const webpack = require('webpack');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({filename: 'home.html', template: './src/pages/home.pug'}),
        new HtmlWebpackPlugin({filename: 'profile.html', template: './src/pages/profile.pug'}),
        new webpack.ProgressPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [
                    /node_modules/
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
                      importLoaders: 2,
                      sourceMap: true,
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
                      paths: [path.resolve(__dirname, '..', 'src')]
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
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: 'dist'
    }
});