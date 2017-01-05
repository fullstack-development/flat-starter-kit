const path = require('path');
const webpack = require('webpack');
const configurator = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = new configurator.default().extend({
    'conf/webpack.development.config.js': config => {
        delete config.devtool;
        delete config.output.pathinfo;

        return config;
    }
}).merge({
    filename: __filename,
    plugins: [
        new CleanPlugin(['./dist'], { root: path.resolve(__dirname, '..') }),
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