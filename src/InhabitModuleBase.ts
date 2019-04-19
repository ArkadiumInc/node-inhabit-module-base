import * as extend from 'xtend';

import { Logger }                       from './Logger';
import { ABTestManager }                from './ABTestManager';
import { ModuleManager }                from './ModuleManager';
import { TextClassificationService }    from './TextClassificationService';

import { IModuleEvents, IFactiveConstructor, IInhabitAPI } from './interfaces';

declare let global: any;

if (!global.__ark_app__) {
    global.__ark_app__ = {};
}

if (!global.__ark_app__.apps) {
    global.__ark_app__.apps = [];
}

const MODULE_STORAGE = global.__ark_app__.apps;

const mustBeOverridden = () => {
    throw Error('This method must be overridden.')
};

export class InhabitModuleBase {
    configuration = {};
    name: string;
    /**
     * @deprecated since 1.4.7
     */
    $: any;
    /**
     * @deprecated since 1.4.7
     */
    handlebars: any;
    textClassificationService: TextClassificationService;
    events: IModuleEvents;
    resourcesRoot: string;
    abTestManager: ABTestManager;
    moduleManager: ModuleManager;
    logger: Logger;

    constructor(configuration: any, dependencies: IInhabitAPI) {
        if (!configuration) {
            throw Error('No configuration presented.');
        }

        if (!dependencies) {
            throw Error('No dependencies presented.');
        }

        this.name = this.constructor.name;
        extend(this, dependencies);
        extend(true, this.configuration, configuration);
    }

    /**
     * Start async task that fetches content and return a this.deffered.promise()
     * @returns {Promise}
     */
    public getContent() {
        mustBeOverridden()
    }

    /**
     * Return a Thumbnail URL
     * @returns {string}
     */
    public getThumbnail() {
        mustBeOverridden()
    }

    /**
     * Return a Title
     * @returns {string}
     */
    public getTitle() {
        mustBeOverridden()
    }

    /**
     * Render content
     * @return {string}
     */
    public display() {
        mustBeOverridden()
    }

    /**
     * Return a Type
     * @returns {string}
     */
    public getType() {
        mustBeOverridden()
    }

    /**
     * Indicate whether interactive has custom preloader or general one should be used
     * @returns {boolean}
     */
    public hasCustomPreloader() {
        return false;
    }

    /**
     * Static method for publishing Modules
     * @static
     * @param Module {InhabitModuleBase}
     */
    public static publish(Module: IFactiveConstructor) {
        Module.moduleName = InhabitModuleBase.getScriptName();
        MODULE_STORAGE.push(Module);
    }

    public static getScriptName() {
        let error
          , source
          , lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/)
          , currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);

        try {
            throw new Error();
        }
        catch (e) {
            error = e;
        }

        if ((source = lastStackFrameRegex.exec(error.stack && error.stack.trim())) && source[1] != "")
            return source[1].replace(/\.js$/, '');
        else if ((source = currentStackFrameRegex.exec(error.stack && error.stack.trim())))
            return source[1].replace(/\.js$/, '');
        else if (error.fileName != undefined)
            return error.fileName.replace(/\.js$/, '');
    }
}
