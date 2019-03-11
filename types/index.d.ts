type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

// imports
import "./betting";
import { BettingModule } from "betting";

type Options<T>    = T extends { initialize: (arg1: any, arg2: infer U) => any } ? U : never;
type BettingOpts   = Options<BettingModule>;
type BettingInit   = typeof BettingModule.prototype.initialize;

export interface IExtensions {
    betting(cfg: Options<BettingModule>): Promise<BettingModule>;
}