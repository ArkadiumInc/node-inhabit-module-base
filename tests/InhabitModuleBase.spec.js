'use strict';

global.__ark_app__ = { apps: [] };

var tape = require('tape'),
    tapSpec = require('tap-spec'),
    InhabitModuleBase = require('../src/InhabitModuleBase');

tape.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout);

var TestModule = function (configuration, dependencies) {
    InhabitModuleBase.call(this, configuration, dependencies);
};

TestModule.prototype = Object.create(InhabitModuleBase.prototype);
TestModule.prototype.constructor = TestModule;

TestModule.prototype.query = function () {
    this.resolve(['test data']);
};

module.exports = function () {
    tape('InhabitWidgetTest', function (t) {
        t.plan(1);

        t.equal(typeof TestModule, 'function', 'TestModule is a function');
    });
};