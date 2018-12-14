import { IExtensions } from "./index";

export interface IInhabitAPI {
    extensions: IExtensions;
    client: string;
    events: IInhabitModuleEvents;
    modalPopup: IModalPopup;
    abTestManager: IABTestManager;
    textClassificationService: ISemantic;
    inhabitEvents: IEventEmitter;
    logger: ILogger;
    resourcesRoot: string;
}

export interface IExtensions extends IExtensions {}

export interface IInhabitModuleEvents {

    /**
     * Fire this event when interactive module loaded all required resources and ready to be displayed to user
     * this triggers hides general preloader.
     */
    ready(msg: string): void;

    /**
     * In case of any error happens inside interactive,
     * fire this event, this will trigger sequence that will hide current
     * interactive and show next in the list
     */
    error(msg: string): void;

    /**
     * Fire this event when user started his interaction with you module.
     * This event should be triggered once per lifetime
     */
    interactionStart(): void;

    /**
     * Trigger this event when user starts new sequence in your module.
     */
    cycleStart(): void;

    /**
     * Trigger this event when users completes cycle and about to start new one
     */
    cycleEnd(): void;

    /**
     * Trigger this event when you need custom event
     */
    custom(params: any): void;

    /**
     * Trigger this event when you need to refresh advertisement in inhabit widget
     */
    refreshAd(): void;
}

interface ISemanticResults {
    "entities": IEntitiesResult;
    "taxonomy": ITaxonomyResult;
}

export interface ISemantic {
    currentUrl: string;
    fetch<T extends keyof ISemanticResults>(method: T): ISemanticResults[T];
}

export interface IEventEmitter {
    on(event: string, handler: (...args: any[]) => any): void;
}

export interface ILogger {
    info(...text: any[]): void;
    warn(...text: any[]): void;
    fail(...text: any[]): void;
}

export interface IModalPopup {
    open(url: string): void;
    openTermsOfService(): void;
    close(): void;
}

export interface IABTestManager {
    getSetting(test: IABTextExperiment<any>): any;
}

interface IABTextExperiment<T> {
    abTest: string;
    experiment: [[T, number]];
    refresh: boolean;
}

interface ITaxonomyResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}

interface IEntitiesResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}

interface IKeywordsResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}
