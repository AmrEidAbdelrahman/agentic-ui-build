import {
  shouldTransform,
  transformSource
} from "./chunk-O2WCKEQD.js";

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
      if (!shouldTransform(id, options)) return null;
      return transformSource(code, id, { ...options, root });
    }
  };
}
var vite_default = agenticSource;

export {
  agenticSource,
  vite_default
};
