const webpack = require('webpack');
const configurator = require('webpack-config');

module.exports = new configurator.default().extend('conf/webpack.base.config.js').merge({
    devtool: 'eval',
    output: {
        pathinfo: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});