"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkD7CYUTJXcjs = require('./chunk-D7CYUTJX.cjs');

// src/vite.ts
function agenticSource(options = {}) {
  let root = options.root;
  return {
    name: "agentic-ui:source",
    enforce: "pre",
    apply: (_config, env) => options.enabled !== false && (options.dev === true || env.command === "build"),
    configResolved(config) {
      root ??= config.root;
    },
    transform(code, id) {
      if (!_chunkD7CYUTJXcjs.shouldTransform.call(void 0, id, options)) return null;
      return _chunkD7CYUTJXcjs.transformSource.call(void 0, code, id, { ...options, root });
    }
  };
}
var vite_default = agenticSource;




exports.agenticSource = agenticSource; exports.vite_default = vite_default;
