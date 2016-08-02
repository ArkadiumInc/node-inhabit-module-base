"use strict";

var usedContent = [];
var MODULE_STORAGE = global.__ark_app__.apps;

/**
 * @constructor
 * @param configuration
 * @param dependencies
 */
function InhabitModuleBase(configuration, dependencies) {
    if (!configuration) {
        throw Error('No configuration presented.');
    }

    if (!dependencies) {
        throw Error('No dependencies presented.');
    }

    if (!this.configuration) {
        this.configuration = {};
    }

    this.name = this.constructor.name;

    this.inject(dependencies).configure(configuration);
}

/**
 * Start async task that fetches content and return a this.deffered.promise()
 * @returns {Promise}
 */
InhabitModuleBase.prototype.getContent = mustBeOverrided;

/**
 * Return a Thumbnail URL
 * @returns {string}
 */
InhabitModuleBase.prototype.getThumbnail = mustBeOverrided;

/**
 * Return a Title
 * @returns {string}
 */
InhabitModuleBase.prototype.getTitle = mustBeOverrided;

/**
 * @returns {boolean}
 */
InhabitModuleBase.prototype.hasContent = mustBeOverrided;

/**
 * Render content
 * @return {string}
 */
InhabitModuleBase.prototype.display = mustBeOverrided;

/**
 * Return a Type
 * @returns {string}
 */
InhabitModuleBase.prototype.getType = mustBeOverrided;

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
    this.events = dependencies.events || { on: console.log.bind(console, 'There is not events') };

    return this;
};

/**
 * Configure
 * @param configuration
 */
InhabitModuleBase.prototype.configure = function(configuration) {
    this.$.extend(true, this.configuration, configuration);

    return this;
};

/**
 * Static method for publishing Modules
 * @static
 * @param {InhabitModuleBase}
 */
InhabitModuleBase.publish = function (Module) {
    MODULE_STORAGE.push(Module);
};

function mustBeOverrided() {
    throw Error('This method must be overrided.');
}

module.exports = InhabitModuleBase;