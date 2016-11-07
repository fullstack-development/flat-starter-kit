const configurator = require('webpack-config');

configurator.environment.setAll({
    env: () => process.env.NODE_ENV
});

// Also you may use `'conf/webpack.[NODE_ENV].config.js'`
module.exports = new configurator.default().extend('conf/webpack.[env].config.js');
