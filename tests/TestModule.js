var InhabitModuleBase = require('../src/InhabitModuleBase');

var TestModule = function (configuration, dependencies) {
    InhabitModuleBase.call(this, configuration, dependencies);
};

TestModule.prototype = Object.create(InhabitModuleBase.prototype);
TestModule.prototype.constructor = TestModule;

TestModule.prototype.query = function () {
    this.resolve(['test data']);
};

module.exports = TestModule;