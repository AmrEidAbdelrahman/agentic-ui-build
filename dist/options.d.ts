import type { SourceAttributeOptions } from './transform.js';
/** JSON-safe options: Turbopack passes loader options as JSON, so RegExps travel as strings. */
export interface LoaderOptions {
    root?: string;
    sourceAttribute?: string;
    componentAttribute?: string | false;
    include?: string;
    exclude?: string;
}
export declare function toTransformOptions(raw: LoaderOptions, fallbackRoot?: string): SourceAttributeOptions;
