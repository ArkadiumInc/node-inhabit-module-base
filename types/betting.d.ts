// Generated by dts-bundle v0.7.3

declare module 'betting' {
    import { IBettingConfig } from "betting/api/IBettingConfig";
    import { IBettingModule } from "betting/api/IBettingModule";
    export class BettingModule implements IBettingModule {
        render(container: HTMLElement, config: IBettingConfig): void;
    }
}

declare module 'betting/api/IBettingConfig' {
    import { IAnalytics } from "betting/api/IAnalytics";
    export interface IBettingConfig {
        debug: boolean;
        locale: string;
        assetsUrl: string;
        teams: string[];
        colors: ITeamColor[];
        analytics: IAnalytics;
    }
    export interface ITeamColor {
        teamId: string;
        colors: string[];
    }
}

declare module 'betting/api/IBettingModule' {
    import { IBettingConfig } from "betting/api/IBettingConfig";
    export interface IBettingModule {
        render(container: HTMLElement, config: IBettingConfig): void;
    }
}

declare module 'betting/api/IAnalytics' {
    export interface IAnalytics {
        track(eventName: string, params: any): void;
    }
}
