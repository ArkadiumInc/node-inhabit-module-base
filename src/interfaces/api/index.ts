import { IFactiveCfg, IFactiveConstructor } from '../factive/';

export interface IInhabitAPI {
    $: any;
    handlebars: any;

    client: string;
    events: IModuleEvents;
    logger: ILogger;
    modalPopup: IModalPopup;
    moduleManager: IModuleManager;
    abTestManager: IABTestManager;
    textClassificationService: ITextClassificationService;
    inhabitEvents: IInhabitEvents;

    resourcesRoot: string;

    ready: boolean;
}

export interface IModuleEvents {
    ready(msg: string): void;
    interactionStart(msg: string): void;
    cycleStart(msg: string): void;
    cycleEnd(msg: string): void;
    error(msg: string): void;
    refreshAd(msg: string): void;
    custom(name: string, msg: string): void;
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

export interface IABTextExperiment<T> {
    abTest: string;
    experiment: [[T, number]];
    refresh: boolean;
}

export interface IModuleManager {
    demand(cfg: IFactiveCfg): Promise<IFactiveConstructor>;
    module(cfg: IFactiveCfg): Promise<IFactiveConstructor>;
    submodule(path: string): Promise<any>;
}

export interface ITextClassificationService {
    V2: Number;
    currentUrl: string;
    getTaxonomy(provider: string): Promise<ITaxonomyResult[]>;
    getEntities(provider: string): Promise<IEntitiesResult>;
    getKeywords(provider: string): Promise<IKeywordsResult>;
    getTextClassification(provider: string, method: string, version?: Number): Promise<IKeywordsResult | IEntitiesResult | ITaxonomyResult>;
}

export interface ITaxonomyResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}

export interface IEntitiesResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}

export interface IKeywordsResult {
    emotion: string;
    misc: any;
    score: number;
    sentiment: string;
    type: string;
    types: string[];
    values: string[];
}

export type EventName = "app.visible" | "app.invisible";

export interface IInhabitEvents {
    on(e: EventName, f: Function): void;
}