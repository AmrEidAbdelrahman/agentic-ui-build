"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }



var _chunkD7CYUTJXcjs = require('./chunk-D7CYUTJX.cjs');

// src/webpack.ts
var _path = require('path');
var _url = require('url');
function loaderPath() {
  if (typeof __dirname === "string") return _path.join.call(void 0, __dirname, "loader.cjs");
  return _url.fileURLToPath.call(void 0, new URL("./loader.cjs", _chunkD7CYUTJXcjs.importMetaUrl));
}
function loaderOptions(options, root) {
  const out = {};
  const r = _nullishCoalesce(options.root, () => ( root));
  if (r) out.root = r;
  if (options.sourceAttribute) out.sourceAttribute = options.sourceAttribute;
  if (options.componentAttribute !== void 0) out.componentAttribute = options.componentAttribute;
  if (options.include) out.include = options.include.source;
  if (options.exclude) out.exclude = options.exclude.source;
  return out;
}
function webpackRule(options = {}, root) {
  return {
    test: _nullishCoalesce(options.include, () => ( _chunkD7CYUTJXcjs.DEFAULT_INCLUDE)),
    exclude: _nullishCoalesce(options.exclude, () => ( _chunkD7CYUTJXcjs.DEFAULT_EXCLUDE)),
    enforce: "pre",
    use: [{ loader: loaderPath(), options: loaderOptions(options, root) }]
  };
}
var AgenticSourcePlugin = class {
  constructor(options = {}) {
    this.options = options;
  }
  
  apply(compiler) {
    if (this.options.enabled === false) return;
    if (!this.options.dev && compiler.options.mode === "development") return;
    compiler.options.module.rules.unshift(webpackRule(this.options, _nullishCoalesce(compiler.options.context, () => ( compiler.context))));
  }
};
var webpack_default = AgenticSourcePlugin;







exports.loaderPath = loaderPath; exports.loaderOptions = loaderOptions; exports.webpackRule = webpackRule; exports.AgenticSourcePlugin = AgenticSourcePlugin; exports.webpack_default = webpack_default;
