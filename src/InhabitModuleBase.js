"use strict";

if(!global.__ark_app__) {
    global.__ark_app__ = {};
}
if(!global.__ark_app__.apps) {
    global.__ark_app__.apps = [];
}

var MODULE_STORAGE = global.__ark_app__.apps;
var InhabitModuleEvents = require("./InhabitModuleEvents");
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
 * Indicate whether interactive has custom preloader or general one should be used
 * @returns {boolean}
 */
InhabitModuleBase.prototype.hasCustomPreloader = function () {
    return false;
};

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
    this.events = dependencies.events || new InhabitModuleEvents();
    this.resourcesRoot = dependencies.resourcesRoot || "";
    this.abTestManager = dependencies.abTestManager;
    this.logger = dependencies.logger;
    return this;
};

/**
 * Configure
 * @param configuration
 */
InhabitModuleBase.prototype.configure = function (configuration) {
    this.$.extend(true, this.configuration, configuration);

    return this;
};

/**
 * Static method for publishing Modules
 * @static
 * @param {InhabitModuleBase}
 */
InhabitModuleBase.publish = function (Module) {
    Module.moduleName = InhabitModuleBase.getScriptName();
    MODULE_STORAGE.push(Module);
};



InhabitModuleBase.getScriptName = function() {
    var error
      , source
      , lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/)
      , currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);

    try { throw new Error(); }
    catch (e) { error = e; }

    if((source = lastStackFrameRegex.exec(error.stack && error.stack.trim())) && source[1] != "")
        return source[1].replace(/\.js$/, '');
    else if((source = currentStackFrameRegex.exec(error.stack && error.stack.trim())))
        return source[1].replace(/\.js$/, '');
    else if(error.fileName != undefined)
        return error.fileName.replace(/\.js$/, '');
}

function mustBeOverrided() {
    throw Error('This method must be overrided.');
}

module.exports = InhabitModuleBase;
