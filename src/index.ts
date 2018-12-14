import xtend from "xtend";

import {
    IABTestManager,
    IEventEmitter,
    IExtensions,
    IInhabitAPI,
    IInhabitModuleEvents,
    ILogger,
    IModalPopup,
    ISemantic,
} from "../types/IInhabitAPI";

declare const global: any;

export abstract class InhabitFactiveBase<T> implements IInhabitAPI {

    public static moduleName: string;

    public static publish(Module: any) {
        if (!global.__ark_app__) {
            global.__ark_app__ = {};
        }

        if (!global.__ark_app__.apps) {
            global.__ark_app__.apps = [];
        }

        Module.moduleName = InhabitFactiveBase.getScriptName();
        global.__ark_app__.apps.push(Module);
    }

    public static getScriptName() {
        const lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
        const currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);

        try {
            throw new Error();
        } catch (error) {
            const source = lastStackFrameRegex.exec(error.stack && error.stack.trim());
            const source2 = currentStackFrameRegex.exec(error.stack && error.stack.trim());
            if (source && source[1] !== "") {
                return source[1].replace(/\.js$/, "");
            } else if (source2) {
                return source2[1].replace(/\.js$/, "");
            } else if (error.fileName !== undefined) {
                return error.fileName.replace(/\.js$/, "");
            }
        }
    }

    public extensions: IExtensions;
    public configuration: T;
    public resourcesRoot: string;
    public client: string;
    public events: IInhabitModuleEvents;
    public modalPopup: IModalPopup;
    public abTestManager: IABTestManager;
    public textClassificationService: ISemantic;
    public inhabitEvents: IEventEmitter;
    public logger: ILogger;

    constructor(configuration: T, dependencies: IInhabitAPI) {
        xtend(this, dependencies);
        xtend(true, this.configuration, configuration);
    }

    public abstract getContent(): Promise<ThisType<T>>;

    public abstract display(element: HTMLElement): void;
}
