import { Binary } from "mongodb";
import { ISecretManagerOptions } from "./Secret";

/**
 * Secret manager interface defining storage and retrieval operations
 * @interface ISecretManager
 */
export interface ISecretManager {

    /**
     * Secret manager configuration options for backend operations
     * @type {ISecretManagerOptions}
     */
    options: ISecretManagerOptions;

    /**
     * Resolves a secret value from the configured backend
     * @param {string} key - The secret key to resolve
     * @param {ISecretManagerOptions} [options] - Optional configuration override
     * @returns {Promise<string | null | undefined | number | boolean>} Promise resolving to the secret value
     * @throws {Error} When secret resolution fails
     */
    resolve(key: string, options?: ISecretManagerOptions): Promise<string | null | undefined | number | boolean>;

    /**
     * Saves a secret value to the configured backend storage
     * @param {string} key - The secret key to store
     * @param {string | Binary} value - The secret value to store
     * @param {ISecretManagerOptions} [options] - Optional configuration override
     * @returns {Promise<boolean>} Promise resolving to true if save operation succeeds
     * @throws {Error} When secret storage fails
     */
    save(key: string, value: string | Binary, options?: ISecretManagerOptions): Promise<boolean>;

    /**
     * Configures the secret manager with the provided options
     * @param options - The configuration options for the secret manager
     */
    configure(options: ISecretManagerOptions): void;
}