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
        new HtmlWebpackPlugin({filename: 'demo.html', template: './src/pages/demo.pug'}),
        new webpack.ProgressPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
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
                      browsers:'last 2 version',
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
                loader: 'pug-loader'
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