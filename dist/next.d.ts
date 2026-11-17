import type { SourceAttributeOptions } from './transform.js';
export type { SourceAttributeOptions } from './transform.js';
type WebpackConfig = {
    module?: {
        rules?: unknown[];
    };
    [key: string]: unknown;
};
type WebpackContext = {
    dev: boolean;
    dir: string;
    [key: string]: unknown;
};
type TurbopackRules = Record<string, unknown>;
export interface NextConfig {
    webpack?: ((config: WebpackConfig, context: WebpackContext) => WebpackConfig) | null;
    turbopack?: {
        rules?: TurbopackRules;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
type NextConfigFn = (phase: string, ctx: {
    defaultConfig: NextConfig;
}) => NextConfig | Promise<NextConfig>;
/**
 * Wraps a Next.js config. Works with webpack and Turbopack builds.
 *
 * ```js
 * import { withAgenticSource } from '@agentic-ui/build-plugin/next';
 * export default withAgenticSource(nextConfig, { enabled: process.env.APP_ENV === 'staging' });
 * ```
 */
export declare function withAgenticSource(config: NextConfig, options?: SourceAttributeOptions): NextConfig;
export declare function withAgenticSource(config: NextConfigFn, options?: SourceAttributeOptions): NextConfigFn;
export default withAgenticSource;
