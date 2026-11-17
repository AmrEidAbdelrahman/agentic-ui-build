"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


var _chunkD7CYUTJXcjs = require('./chunk-D7CYUTJX.cjs');

// src/options.ts
function toTransformOptions(raw, fallbackRoot) {
  const out = {};
  const root = _nullishCoalesce(raw.root, () => ( fallbackRoot));
  if (root) out.root = root;
  if (raw.sourceAttribute) out.sourceAttribute = raw.sourceAttribute;
  if (raw.componentAttribute !== void 0) out.componentAttribute = raw.componentAttribute;
  if (raw.include) out.include = new RegExp(raw.include);
  if (raw.exclude) out.exclude = new RegExp(raw.exclude);
  return out;
}

// src/loader.ts
function agenticSourceLoader(code, map) {
  _optionalChain([this, 'access', _ => _.cacheable, 'optionalCall', _2 => _2(true)]);
  const raw = _nullishCoalesce(_nullishCoalesce(_optionalChain([this, 'access', _3 => _3.getOptions, 'optionalCall', _4 => _4()]), () => ( (typeof this.query === "object" ? this.query : void 0))), () => ( {}));
  const options = toTransformOptions(raw, this.rootContext);
  if (!_chunkD7CYUTJXcjs.shouldTransform.call(void 0, this.resourcePath, options)) {
    this.callback(null, code, map);
    return;
  }
  const result = _chunkD7CYUTJXcjs.transformSource.call(void 0, code, this.resourcePath, options);
  if (!result) this.callback(null, code, map);
  else this.callback(null, result.code, result.map);
}


exports.default = agenticSourceLoader;

module.exports = exports.default;
