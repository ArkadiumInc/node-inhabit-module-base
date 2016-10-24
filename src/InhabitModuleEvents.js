"use strict";
/**
 * Created by WMTS on 10/24/2016.
 */
function InhabitModuleEvents() {

}
InhabitModuleEvents.prototype =
{
    /**
     * Fire this event when interactive module loaded all required resources and ready to be displayed to user
     * this triggers hides general preloader.
     */
    ready: undefined.interfaceMethod,
    /**
     * In case of any error happens inside interactive, fire this event, this will trigger sequence that will hide current
     * interactive and show next in the list
     */
    error: undefined.interfaceMethod,
    /**
     * Fire this event when user started his interaction with you module. This event should be triggered once per lifetime
     */
    interactionStart: undefined.interfaceMethod,
    /**
     * Trigger this event when user starts new sequence in your module.
     */
    cycleStart: undefined.interfaceMethod,
    /**
     * Trigger this event when users completes cycle and about to start new one
     */
    cycleEnd: undefined.interfaceMethod,

    interfaceMethod: function interfaceMethod() {
        console.log("this is interface method would be implemented later through the core");
    }
};

module.exports = InhabitModuleEvents;