import {
  loaderOptions,
  loaderPath,
  webpackRule
} from "./chunk-S6IT456X.js";

// src/next.ts
var TURBOPACK_GLOBS = ["*.tsx", "*.jsx", "*.js", "*.mjs"];
function turbopackRules(existing, options) {
  const rules = { ...existing };
  const condition = options.dev ? { not: "foreign" } : { all: [{ not: "foreign" }, { not: "development" }] };
  const ours = {
    loaders: [{ loader: loaderPath(), options: loaderOptions(options, process.cwd()) }],
    condition
  };
  for (const glob of TURBOPACK_GLOBS) {
    const prev = rules[glob];
    rules[glob] = prev === void 0 ? ours : [ours, ...Array.isArray(prev) ? prev : [prev]];
  }
  return rules;
}
function apply(config, options) {
  const userWebpack = config.webpack;
  return {
    ...config,
    webpack(webpackConfig, ctx) {
      const out = userWebpack ? userWebpack(webpackConfig, ctx) : webpackConfig;
      if (ctx.dev && !options.dev) return out;
      out.module ??= {};
      out.module.rules ??= [];
      out.module.rules.unshift(webpackRule(options, ctx.dir));
      return out;
    },
    turbopack: { ...config.turbopack, rules: turbopackRules(config.turbopack?.rules, options) }
  };
}
function withAgenticSource(config = {}, options = {}) {
  if (options.enabled === false) return config;
  if (typeof config === "function") return async (phase, ctx) => apply(await config(phase, ctx), options);
  return apply(config, options);
}
var next_default = withAgenticSource;

export {
  withAgenticSource,
  next_default
};
