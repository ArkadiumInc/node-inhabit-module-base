import { IFactive } from './IFactive';
import { IFactiveCfg } from './IFactiveCfg';
import { IInhabitAPI } from '../api/';

export interface IFactiveConstructor {
    new (cfg: IFactiveCfg, deps: IInhabitAPI): IFactive;
    moduleName: string;
    moduleType: string;
    cfg: IFactiveCfg;
    api: IInhabitAPI;
    resourcesRoot?: string;
}
