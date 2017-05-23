import { ModuleCfg } from './ModuleCfg';

export interface InhabitModuleEvents {
    /**
     * Configuration that will be passed to the analytics
     * @type {{name: string, version: string}}
     */
    moduleConfiguration: ModuleCfg;

    /**
     * Initializes module events, should be called first, before any interactions
     * @param {{name: string, version: string}} moduleConfiguration
     */
    init(moduleConfiguration);

    /**
     * Fire this event when interactive module loaded all required resources and ready to be displayed to user
     * this triggers hides general preloader.
     */
    ready();

    /**
     * In case of any error happens inside interactive, fire this event, this will trigger sequence that will hide current
     * interactive and show next in the list
     */
    error();

    /**
     * Fire this event when user started his interaction with you module. This event should be triggered once per lifetime
     */
    interactionStart();

    /**
     * Trigger this event when user starts new sequence in your module.
     */
    cycleStart();

    /**
     * Trigger this event when users completes cycle and about to start new one
     */
    cycleEnd();

    /**
     * Trigger this event when you need custom event
     */
    custom();

    /**
     * Trigger this event when you need to refresh advertisement in inhabit widget
     */
    refreshAd();
}
