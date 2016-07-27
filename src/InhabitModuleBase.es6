/**
 * Inhabit Module Base class
 */
export default class InhabitModuleBase {

    /**
     * @constructor
     * @param configuration
     * @param dependencies {{$}, {handlebars}, {textClassificationService}, {searchEngineService}}
     */
    constructor(configuration, dependencies) {
        if (!configuration) {
            throw Error('No configuration presented.');
        }

        if (!dependencies) {
            throw Error('No dependencies presented.');
        }

        this.configure(configuration)
            .inject(dependencies);

        this.deffered = this.$.Deffered();
        this.content = [];
    }

    /**
     * Start fetching content and return a promise
     * @returns {Promise}
     */
    getContent() {
        this.fetch();
        return this.deffered.promise();
    }

    /**
     * Return true if have
     * @returns {boolean}
     */
    hasContent() {
        return !!this.content.length;
    }

    /**
     * Start async fetching
     */
    async fetch() {
        var fetchMethod = this.configuration.deliveryMethod.name;
        var fetchParameters = this.configuration.deliveryMethod;

        if (typeof this[fetchMethod] !== 'function') {
            throw Error('No such fetchMethod: ' + fetchMethod);
        }

        // Execute a fetchMethod
        this[fetchMethod](fetchParameters);
    }

    /**
     * Store dependencies
     * @param dependencies
     * @returns {InhabitModuleBase}
     */
    inject(dependencies) {
        this.$ = dependencies.$;
        this.handlebars = dependencies.handlebars;
        this.textClassificationService = dependencies.textClassificationService;
        this.searchEngineService = dependencies.searchEngineService;

        return this;
    }

    /**
     * Store configuration
     * @param configuration
     * @returns {InhabitModuleBase}
     */
    configure(configuration) {
        this.configuration = configuration;

        return this;
    }
}