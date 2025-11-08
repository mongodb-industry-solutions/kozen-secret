/**
 * @fileoverview Secret management configuration models
 * Defines interfaces for secure secret storage and retrieval configuration
 * @author MDB SAT
 * @since 1.0.4
 * @version 1.0.5
 */

import { IArgs, IMdbClientOpt } from "@mongodb-solution-assurance/kozen";
import { ICloudOptions } from "./CloudOptions";

/**
 * Configuration interface for secret management backend
 * @interface ISecretManagerOptions
 */
export interface ISecretManagerOptions {
    /**
     * Flow identifier for tracking and logging secret operations
     * @type {string}
     */
    flow?: string;

    /**
     * Secret backend type for storage and retrieval operations
     * @type {string}
     * Supported backends: AWS, MDB, ENV
     */
    type?: string;

    /**
     * Cloud provider authentication settings for AWS integration
     * @type {Object}
     */
    cloud?: ICloudOptions;

    /**
     * MongoDB storage configuration for encrypted secret management
     * @type {Object}
     */
    mdb?: IMdbClientOpt;
}

/**
 * Secret management CLI arguments interface
 * @interface ISecretArgs
 * @extends IArgs
 */
export interface ISecretArgs extends IArgs {
    /**
     * Secret key identifier for storage and retrieval operations
     * @type {string}
     */
    key?: string;

    /**
     * Secret value content for storage operations
     * @type {string}
     */
    value?: string;
}