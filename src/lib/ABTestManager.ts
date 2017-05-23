import { ABTest }       from './ABTest';
import { ModuleCfg }    from './ModuleCfg';

export interface ABTestManager {
    getSetting(prop: ABTest<ModuleCfg>): ModuleCfg;
}