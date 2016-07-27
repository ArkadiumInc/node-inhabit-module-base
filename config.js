/**
 * Created by daniil.kolesnik on 7/27/2016.
 */

var path = require('path'),
    config = {
        debug: process.env.DEBUG || false,
        source: path.resolve('./src/'),
        destination: path.resolve('./build/')
    };

module.exports = config;