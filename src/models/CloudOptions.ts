export interface ICloudOptions {
    /**
     * Cloud region for AWS services configuration
     * @type {string}
     */
    region?: string;

    /**
     * Access key identifier for AWS authentication
     * @type {string}
     */
    accessKeyId?: string;

    /**
     * Secret access key for AWS authentication
     * @type {string}
     */
    secretAccessKey?: string;
}