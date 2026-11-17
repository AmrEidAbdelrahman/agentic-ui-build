/** The slice of webpack's loader context this loader uses; Turbopack provides the same. */
interface LoaderContext {
    resourcePath: string;
    rootContext?: string;
    getOptions?: () => unknown;
    query?: unknown;
    callback: (err: Error | null, code?: string, map?: unknown) => void;
    cacheable?: (flag?: boolean) => void;
}
/** webpack / Turbopack loader: adds `data-source` and `data-component` to JSX host elements. */
export default function agenticSourceLoader(this: LoaderContext, code: string, map?: unknown): void;
export {};
