type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

// imports
import "./betting";
import { BettingModule } from "betting";
type BettingRender = typeof BettingModule.prototype.render;

export interface IExtensions {
    betting(cfg: SecondArgument<BettingRender>): void;
}