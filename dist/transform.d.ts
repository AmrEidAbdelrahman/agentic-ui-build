import MagicString from 'magic-string';
export interface SourceAttributeOptions {
    /** Turn the plugin off without removing it, e.g. `enabled: process.env.APP_ENV === 'staging'`. Default `true`. */
    enabled?: boolean;
    /**
     * Also tag elements in dev builds. Default `false`: in dev the React adapter
     * already reads sources and call sites, which beats what attributes can carry.
     */
    dev?: boolean;
    /** Paths in `data-source` are relative to this directory. Default `process.cwd()`. */
    root?: string;
    /** Attribute holding `file:line:column`. Default `data-source`. */
    sourceAttribute?: string;
    /** Attribute naming the enclosing component, or `false` to leave it out. Default `data-component`. */
    componentAttribute?: string | false;
    /** Files to transform. Default `.js`, `.jsx`, `.mjs` and `.tsx`. */
    include?: RegExp;
    /** Files to skip. Default anything under `node_modules`. */
    exclude?: RegExp;
}
export interface TransformResult {
    code: string;
    map: ReturnType<MagicString['generateMap']>;
}
export declare const DEFAULT_INCLUDE: RegExp;
export declare const DEFAULT_EXCLUDE: RegExp;
/** Strips a bundler query (`?v=123`) or hash from a module id. */
export declare function cleanId(id: string): string;
export declare function shouldTransform(id: string, options?: SourceAttributeOptions): boolean;
/** The path written into `data-source`: relative to root, with forward slashes. */
export declare function displayPath(file: string, root: string): string;
/**
 * Adds `data-source="src/ui/Button.tsx:8:5"` to every JSX host element, and
 * `data-component="Button"` naming the component function it sits in.
 * Returns `null` when nothing changed or the file doesn't parse.
 */
export declare function transformSource(code: string, id: string, options?: SourceAttributeOptions): TransformResult | null;
