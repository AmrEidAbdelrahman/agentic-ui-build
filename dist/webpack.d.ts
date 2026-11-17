import { type SourceAttributeOptions } from './transform.js';
import type { LoaderOptions } from './options.js';
export type { SourceAttributeOptions } from './transform.js';
/** Absolute path of the CommonJS loader, which webpack and Turbopack can both load. */
export declare function loaderPath(): string;
/** Loader options as JSON, the form Turbopack requires. */
export declare function loaderOptions(options: SourceAttributeOptions, root?: string): LoaderOptions;
export interface WebpackRule {
    test: RegExp;
    exclude: RegExp;
    enforce: 'pre';
    use: Array<{
        loader: string;
        options: LoaderOptions;
    }>;
}
/** A webpack rule that runs the loader before Babel, SWC or ts-loader see the file. */
export declare function webpackRule(options?: SourceAttributeOptions, root?: string): WebpackRule;
interface Compiler {
    context?: string;
    options: {
        mode?: string;
        context?: string;
        module: {
            rules: unknown[];
        };
    };
}
/**
 * webpack plugin.
 *
 * ```js
 * const { AgenticSourcePlugin } = require('@agentic-ui/build-plugin/webpack');
 * module.exports = { plugins: [new AgenticSourcePlugin({ enabled: process.env.APP_ENV === 'staging' })] };
 * ```
 */
export declare class AgenticSourcePlugin {
    private readonly options;
    constructor(options?: SourceAttributeOptions);
    apply(compiler: Compiler): void;
}
export default AgenticSourcePlugin;
