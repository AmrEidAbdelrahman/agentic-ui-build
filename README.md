# @agentic-ui/build-plugin

Adds two attributes to every JSX host element (`<div>`, `<button>`, `<my-widget>`) at build time:

```html
<button data-source="src/ui/Button.tsx:4:5" data-component="Button" class="btn">Apply</button>
```

The Agentic UI extension reads them, so a note filed on staging names the component and the file and line, not just a selector. Production React builds minify component names and drop source info, so without these attributes a staging ticket only has grep anchors.

- `data-source` is the path relative to the project root, then line and column.
- `data-component` is the component function the element is written in. Nested components give the ticket a hierarchy, such as `OrdersPage › FilterPanel › Button`.
- Components (`<Button>`), fragments and member tags (`<motion.div>`) are left alone, so no props reach your components.
- Attributes you wrote by hand are kept.
- Server and client builds get the same attributes, so hydration still matches.

The plugin is **off in dev** by default. In dev the React adapter already reads sources and call sites from React, and gets more out of them than these attributes carry.

## Install

```sh
npm i -D github:AmrEidAbdelrahman/agentic-ui-build-plugin#v0.1.0
```

Pin a tag so `npm ci` stays reproducible. pnpm and yarn take the same spec.

## Turn it on for staging only

These attributes put your file paths into the HTML. Gate the plugin to staging builds:

### Vite

```ts
import { agenticSource } from '@agentic-ui/build-plugin/vite';

export default defineConfig({
  plugins: [agenticSource({ enabled: process.env.APP_ENV === 'staging' }), react()],
});
```

### Next.js (Turbopack or webpack)

```js
import { withAgenticSource } from '@agentic-ui/build-plugin/next';

export default withAgenticSource(nextConfig, { enabled: process.env.APP_ENV === 'staging' });
```

Works for `next build` and `next build --webpack`, and with a config written as a function.

### webpack

```js
const { AgenticSourcePlugin } = require('@agentic-ui/build-plugin/webpack');

module.exports = {
  plugins: [new AgenticSourcePlugin({ enabled: process.env.APP_ENV === 'staging' })],
};
```

The loader runs as a `pre` rule, before Babel, SWC or ts-loader. If you prefer to add a rule yourself, use `webpackRule(options)` or point at `@agentic-ui/build-plugin/loader`.

## Options

| Option | Default | |
| --- | --- | --- |
| `enabled` | `true` | `false` turns the plugin off. |
| `dev` | `false` | Also tag elements in dev builds. |
| `root` | Vite root, webpack context, or the cwd | Paths are relative to this. |
| `sourceAttribute` | `'data-source'` | Change it only if you also change the extension's attributes adapter. |
| `componentAttribute` | `'data-component'` | `false` leaves it out. |
| `include` | `/\.(?:m?jsx?\|tsx)$/` | Files to transform. |
| `exclude` | `/[\\/]node_modules[\\/]/` | Files to skip. |

Works with any JSX framework that passes host-element attributes to the DOM, such as React, Preact and Solid. Vue and Svelte templates are not covered.
# agentic-ui-build
