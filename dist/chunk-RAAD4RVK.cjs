"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunkVLJ3LUHDcjs = require('./chunk-VLJ3LUHD.cjs');

// src/next.ts
var TURBOPACK_GLOBS = ["*.tsx", "*.jsx", "*.js", "*.mjs"];
function turbopackRules(existing, options) {
  const rules = { ...existing };
  const condition = options.dev ? { not: "foreign" } : { all: [{ not: "foreign" }, { not: "development" }] };
  const ours = {
    loaders: [{ loader: _chunkVLJ3LUHDcjs.loaderPath.call(void 0, ), options: _chunkVLJ3LUHDcjs.loaderOptions.call(void 0, options, process.cwd()) }],
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
      out.module.rules.unshift(_chunkVLJ3LUHDcjs.webpackRule.call(void 0, options, ctx.dir));
      return out;
    },
    turbopack: { ...config.turbopack, rules: turbopackRules(_optionalChain([config, 'access', _ => _.turbopack, 'optionalAccess', _2 => _2.rules]), options) }
  };
}
function withAgenticSource(config = {}, options = {}) {
  if (options.enabled === false) return config;
  if (typeof config === "function") return async (phase, ctx) => apply(await config(phase, ctx), options);
  return apply(config, options);
}
var next_default = withAgenticSource;




exports.withAgenticSource = withAgenticSource; exports.next_default = next_default;
