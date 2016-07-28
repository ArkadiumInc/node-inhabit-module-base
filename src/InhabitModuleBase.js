"use strict";

var usedContent = [];
var MODULE_STORAGE = global.__ark_app__.apps;

/**
 * setImmediate polyfill
 */
(function (global) {
    if (!global.setImmediate) global.setImmediate = (function() {
        var head = { }, tail = head;

        var ID = Math.random();
        function onmessage(e) {
            if(e.data != ID) return;
            head = head.next;
            var func = head.func;
            delete head.func;
            func();
        }

        if(global.addEventListener) { // IE9+
            global.addEventListener('message', onmessage);
        } else { // IE8
            global.attachEvent('onmessage', onmessage );
        }

        return function(func) {
            tail = tail.next = { func: func };
            global.postMessage(ID, "*");
        };
    }());
})(global || window);

/**
 *
 * @param configuration
 * @param dependencies
 * @constructor
 */
function InhabitModuleBase(configuration, dependencies) {
    if (!configuration) {
        throw Error('No configuration presented.');
    }

    if (!dependencies) {
        throw Error('No dependencies presented.');
    }

    this.configure(configuration)
        .inject(dependencies);

    this.name = this.constructor.name;
    this.deferred = this.$.Deferred();
    this.content = [];
}

/**
 * Store dependencies
 * @param dependencies
 * @returns {InhabitModuleBase}
 */
InhabitModuleBase.prototype.inject = function (dependencies) {
    this.$ = dependencies.$;
    this.handlebars = dependencies.handlebars;
    this.textClassificationService = dependencies.textClassificationService;
    this.searchEngineService = dependencies.searchEngineService;

    return this;
};

/**
 * Configure
 * @param configuration
 */
InhabitModuleBase.prototype.configure = function(configuration) {
    this.configuration = configuration;

    return this;
};

/**
 * Resolve data
 *
 * @param data
 */
InhabitModuleBase.prototype.resolve = function (data) {
    data.next = function () {
        for (var i = 0; i < data.length; i++) {
            if (usedContent.indexOf(data[i].id) === -1) {
                usedContent.push(data[i].id);
                return data[i];
            }
        }
    };

    this.deferred.resolve(data);
};

/**
 * Static method for publishing Modules
 * @param module
 */
InhabitModuleBase.publish = function (module) {
    MODULE_STORAGE.push(module);
};

module.exports = InhabitModuleBase;