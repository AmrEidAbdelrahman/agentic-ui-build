import {
  DEFAULT_EXCLUDE,
  DEFAULT_INCLUDE,
  __dirname
} from "./chunk-O2WCKEQD.js";

// src/webpack.ts
import { join } from "path";
import { fileURLToPath } from "url";
function loaderPath() {
  if (typeof __dirname === "string") return join(__dirname, "loader.cjs");
  return fileURLToPath(new URL("./loader.cjs", import.meta.url));
}
function loaderOptions(options, root) {
  const out = {};
  const r = options.root ?? root;
  if (r) out.root = r;
  if (options.sourceAttribute) out.sourceAttribute = options.sourceAttribute;
  if (options.componentAttribute !== void 0) out.componentAttribute = options.componentAttribute;
  if (options.include) out.include = options.include.source;
  if (options.exclude) out.exclude = options.exclude.source;
  return out;
}
function webpackRule(options = {}, root) {
  return {
    test: options.include ?? DEFAULT_INCLUDE,
    exclude: options.exclude ?? DEFAULT_EXCLUDE,
    enforce: "pre",
    use: [{ loader: loaderPath(), options: loaderOptions(options, root) }]
  };
}
var AgenticSourcePlugin = class {
  constructor(options = {}) {
    this.options = options;
  }
  options;
  apply(compiler) {
    if (this.options.enabled === false) return;
    if (!this.options.dev && compiler.options.mode === "development") return;
    compiler.options.module.rules.unshift(webpackRule(this.options, compiler.options.context ?? compiler.context));
  }
};
var webpack_default = AgenticSourcePlugin;

export {
  loaderPath,
  loaderOptions,
  webpackRule,
  AgenticSourcePlugin,
  webpack_default
};
