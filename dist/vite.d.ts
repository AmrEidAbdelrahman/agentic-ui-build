import type { Plugin } from 'vite';
import { type SourceAttributeOptions } from './transform.js';
export type { SourceAttributeOptions } from './transform.js';
/**
 * Vite plugin. Runs before other plugins, so it sees the JSX as written.
 *
 * ```ts
 * import { agenticSource } from '@agentic-ui/build-plugin/vite';
 * export default defineConfig({ plugins: [agenticSource({ enabled: process.env.APP_ENV === 'staging' }), react()] });
 * ```
 */
export declare function agenticSource(options?: SourceAttributeOptions): Plugin;
export default agenticSource;
