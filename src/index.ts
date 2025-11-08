import { IConfig, IDependency, KzModule } from "@mongodb-solution-assurance/kozen";
import cli from "./configs/cli.json";
import ioc from "./configs/ioc.json";
import mcp from "./configs/mcp.json";
import fs from 'fs';
import path from 'path';

export class SecretModule extends KzModule {

    constructor(dependency?: any) {
        super(dependency);
        this.metadata.alias = 'secret';
        const pac = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
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

export { ISecretArgs, ISecretManagerOptions } from './models/Secret';
export { ISecretManager } from './models/SecretManager';
export { SecretManager } from './services/SecretManager';
export { SecretManagerAWS } from './services/SecretManagerAWS';
export { SecretManagerMDB } from './services/SecretManagerMDB';
export { SecretController } from './controllers/SecretCLIController';
export { SecretController as SecretMCPController } from './controllers/SecretMCPController';