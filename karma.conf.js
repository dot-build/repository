/* jshint node: true */
module.exports = function(config) {
    'use strict';

    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: ['src/**/*.js', 'test/**/*.spec.js', 'test/adapter/MockAdapter.js'],
        preprocessors: {
            'src/**/*.js': ['babel'],
            'test/adapter/MockAdapter.js': ['babel']
        },
    });
};
