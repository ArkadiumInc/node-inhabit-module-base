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

    this.deferred = this.$.Deferred();
    this.content = [];
}

/**
 * Get Content
 * @returns {*}
 */
InhabitModuleBase.prototype.getContent = function () {
    setTimeout(this.getDeliveryMethod(), 1);
    return this.deferred.promise();
};

/**
 *
 * @returns {boolean}
 */
InhabitModuleBase.prototype.hasContent = function () {
    return !!this.content.length;
};

/**
 * Return a fetch method
 */
InhabitModuleBase.prototype.getDeliveryMethod = function () {
    var deliveryMethod = this.configuration.deliveryMethod.name,
        deliveryParameters = this.configuration.deliveryMethod;

    if (typeof this[deliveryMethod] !== 'function') {
        throw Error('No such fetchMethod: ' + deliveryMethod);
    }

    return this[deliveryMethod].bind(this, deliveryParameters);
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

module.exports = InhabitModuleBase;