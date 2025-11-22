/**
 * @fileoverview SecretController - CLI to SecretManager bridge component
 * Controller for managing encrypted secrets through CLI interactions with pluggable SecretManager providers.
 * Supports operations like storing, retrieving, and managing secrets with encryption across multiple backends.
 *
 * @author IaC Pipeline Team
 * @since 1.0.0
 * @version 1.1.0
 */
import path from 'path';
import { ISecretArgs } from '../models/Secret';
import { ISecretManager } from '../models/SecretManager';
import { CLIController, IAction, IArgs, IConfig, IModule } from '@kozen/engine';

/**
 * @class SecretController
 * @extends CLIController
 * @description CLI controller for managing encrypted secrets and credentials.
 */
export class SecretController extends CLIController {

    /**
     * Saves an encrypted secret to the configured secret management backend
     * Stores the secret using the resolved SecretManager service with automatic encryption
     * 
     * @param {Object} options - Secret storage options
     * @param {string} options.key - Unique identifier for the secret
     * @param {string} options.value - Secret value to be encrypted and stored
     * @returns {Promise<boolean>} Promise resolving to true if save operation succeeds, false otherwise
     * @throws {Error} When secret manager resolution fails or storage operation encounters errors
     * @public
     */
    public async set(options: { key: string, value: string }): Promise<boolean> {
        try {
            const { key, value } = options;
            const srvSecret = await this.assistant?.resolve<ISecretManager>('secret:manager');
            const result = await srvSecret!.save(key, value);
            this.logger?.info({
                flow: this.getId(options as unknown as IConfig),
                src: 'Secret:Controller:set',
                message: `✅ Secret '${key}' saved successfully.`
            });
            return result;
        } catch (error) {
            this.logger?.error({
                flow: this.getId(options as unknown as IConfig),
                src: 'Secret:Controller:set',
                message: `❌ Failed to resolve secret '${options.key}': ${(error as Error).message}`
            });
            return false;
        }
    }

    /**
     * Retrieves and decrypts a secret from the configured secret management backend
     * Resolves the secret using the SecretManager service with automatic decryption
     * 
     * @param {Object} options - Secret retrieval options
     * @param {string} options.key - Unique identifier of the secret to retrieve
     * @returns {Promise<string | null>} Promise resolving to decrypted secret value or null if not found
     * @throws {Error} When secret manager resolution fails or retrieval operation encounters errors
     * @public
     */
    public async get(options: { key: string, driver: string }): Promise<string | null> {
        try {
            const { key, driver } = options;
            const srvSecret = await this.assistant?.resolve<ISecretManager>('secret:manager');

            if (!srvSecret) {
                throw new Error("Failed to resolve SecretManager.");
            }

            srvSecret.configure({
                flow: this.getId(options as unknown as IConfig),
                type: driver
            });

            const value = await srvSecret.resolve(key);
            if (value) {
                this.logger?.info({
                    flow: this.getId(options as unknown as IConfig),
                    src: 'Secret:Controller:get',
                    message: `✅ Resolved secret '${key}': ${value}`
                });
            } else {
                this.logger?.info({
                    flow: this.getId(options as unknown as IConfig),
                    src: 'Secret:Controller:get',
                    message: `🔍 Secret '${key}' not found.`
                });
            }
            return String(value) || null;
        } catch (error) {
            this.logger?.error({
                flow: this.getId(options as unknown as IConfig),
                src: 'Secret:Controller:get',
                message: `❌ Failed to resolve secret '${options.key}': ${(error as Error).message}`
            });
            return null;
        }
    }

    /**
     * Retrieves metadata information about the secret management configuration
     * Provides details about the current SecretManager backend and its configuration
     * 
     * @param {Object} options - Metadata retrieval options
     * @param {string} options.key - Key identifier (currently unused but maintained for interface consistency)
     * @returns {Promise<any | null>} Promise resolving to secret manager configuration metadata or null if unavailable
     * @public
     */
    public async metadata(options: { key: string }) {
        try {
            const srvSecret = await this.assistant?.resolve<ISecretManager>('secret:manager');
            return srvSecret?.options;
        } catch (error) {
            this.logger?.error({
                flow: this.getId(options as unknown as IConfig),
                src: 'Secret:Controller:metadata',
                message: `❌ Failed to resolve secret manager metadata: ${(error as Error).message}`
            });
            return null;
        }
    }

    /**
     * Displays comprehensive CLI usage information for secret management operations
     * Shows available commands, options, and examples for the Secret Manager tool
     * 
     * @returns {void}
     * @public
     */
    public async help(): Promise<void> {
        const mod = await this.assistant?.get<IModule>('module:secret');
        const dir = process.env.DOCS_DIR || path.resolve(__dirname, '../docs');
        const helpText = await this.srvFile?.select('secret', dir);
        super.help({
            title: `'${mod?.metadata?.alias || 'Secret' }' from '${mod?.metadata?.name}' package`,
            body: helpText,
            version: mod?.metadata?.version,
            uri: mod?.metadata?.uri
        });
    }

    /**
     * Parses and processes command line arguments specific to secret management operations
     * Extends base argument parsing with secret-specific defaults and environment variable fallbacks
     * 
     * @param {string[] | IArgs} args - Raw command line arguments array or pre-parsed arguments
     * @returns {Promise<ISecretArgs>} Promise resolving to structured secret arguments with defaults applied
     * @public
     */
    public async fill(args: string[] | IArgs): Promise<ISecretArgs> {
        let parsed: Partial<ISecretArgs> = this.extract(args);
        parsed.action !== 'metadata' && (parsed.key = parsed.key || (process.env.KOZEN_SM_KEY as IAction));
        parsed.action === 'set' && (parsed.value = parsed.value || process.env.KOZEN_SM_VAL);
        parsed.driver = process.env.KOZEN_SM_DRIVER || parsed.driver;
        return parsed as ISecretArgs;
    }
}
