import {
  shouldTransform,
  transformSource
} from "./chunk-O2WCKEQD.js";

// src/options.ts
function toTransformOptions(raw, fallbackRoot) {
  const out = {};
  const root = raw.root ?? fallbackRoot;
  if (root) out.root = root;
  if (raw.sourceAttribute) out.sourceAttribute = raw.sourceAttribute;
  if (raw.componentAttribute !== void 0) out.componentAttribute = raw.componentAttribute;
  if (raw.include) out.include = new RegExp(raw.include);
  if (raw.exclude) out.exclude = new RegExp(raw.exclude);
  return out;
}

// src/loader.ts
function agenticSourceLoader(code, map) {
  this.cacheable?.(true);
  const raw = this.getOptions?.() ?? (typeof this.query === "object" ? this.query : void 0) ?? {};
  const options = toTransformOptions(raw, this.rootContext);
  if (!shouldTransform(this.resourcePath, options)) {
    this.callback(null, code, map);
    return;
  }
  const result = transformSource(code, this.resourcePath, options);
  if (!result) this.callback(null, code, map);
  else this.callback(null, result.code, result.map);
}
export {
  agenticSourceLoader as default
};
