import { ModuleCfg } from './ModuleCfg';

export interface ModuleManager {
    config?: any;
    demand(cfg: ModuleCfg, comp: any): Promise<any>
}