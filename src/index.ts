
import { IConfig, IDependency, KzModule } from "@mongodb-solution-assurance/kozen";
import cli from "./configs/cli.json";
import ioc from "./configs/ioc.json";
import mcp from "./configs/mcp.json";
import pac from "../package.json";

export { ISecretArgs, ISecretManager, ISecretManagerOptions } from './models/Secret';

export class SecretModule extends KzModule {

    constructor(dependency?: any) {
        super(dependency);
        this.metadata.alias = 'secret';
        this.metadata.summary = pac.description;
        this.metadata.version = pac.version;
        this.metadata.author = pac.author;
        this.metadata.license = pac.license;
        this.metadata.name = pac.name;
    }

    public register(config: IConfig | null, opts?: any): Promise<Record<string, IDependency> | null> {
        let dep = {};
        switch (config?.type) {
            case 'mcp':
                dep = { ...ioc, ...mcp };
                break;
            case 'cli':
                dep = { ...ioc, ...cli };
                break;
            default:
                dep = ioc;
                break;
        }
        dep = this.fix(dep);
        return Promise.resolve(dep as Record<string, IDependency>);
    }
}
