"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// ../../node_modules/.pnpm/tsup@9.0.0_postcss@8.5.32_typescript@7.0.2/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" ? document.currentScript.src : new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/transform.ts
var _parser = require('@babel/parser');
var _magicstring = require('magic-string'); var _magicstring2 = _interopRequireDefault(_magicstring);
var _path = require('path');
var DEFAULT_INCLUDE = /\.(?:m?jsx?|tsx)$/;
var DEFAULT_EXCLUDE = /[\\/]node_modules[\\/]/;
function cleanId(id) {
  return id.replace(/[?#].*$/, "");
}
function shouldTransform(id, options = {}) {
  if (id.startsWith("\0")) return false;
  const file = cleanId(id);
  return (_nullishCoalesce(options.include, () => ( DEFAULT_INCLUDE))).test(file) && !(_nullishCoalesce(options.exclude, () => ( DEFAULT_EXCLUDE))).test(file);
}
function parserPlugins(file) {
  if (/\.tsx$/.test(file)) return ["jsx", "typescript"];
  if (/\.[cm]?ts$/.test(file)) return ["typescript"];
  return ["jsx"];
}
function displayPath(file, root) {
  const rel = _path.isAbsolute.call(void 0, file) ? _path.relative.call(void 0, root, file) : file;
  return rel.split(_path.sep).join("/");
}
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
var isNode = (v) => typeof v === "object" && v !== null && typeof v.type === "string";
var isComponentName = (name) => typeof name === "string" && /^[A-Z]/.test(name);
function hostTagName(opening) {
  const name = opening.name;
  if (name.type !== "JSXIdentifier") return void 0;
  const tag = name.name;
  return /^[a-z]/.test(tag) ? tag : void 0;
}
function hasAttribute(opening, attr) {
  return opening.attributes.some(
    (a) => a.type === "JSXAttribute" && a.name.type === "JSXIdentifier" && a.name.name === attr
  );
}
var SKIP_KEYS = /* @__PURE__ */ new Set(["loc", "start", "end", "extra", "comments", "leadingComments", "trailingComments", "innerComments", "range"]);
function transformSource(code, id, options = {}) {
  if (!code.includes("<")) return null;
  const file = cleanId(id);
  const plugins = parserPlugins(file);
  if (!plugins.includes("jsx")) return null;
  let ast;
  try {
    ast = _parser.parse.call(void 0, code, { sourceType: "module", plugins, errorRecovery: true });
  } catch (e) {
    return null;
  }
  const sourceAttr = _nullishCoalesce(options.sourceAttribute, () => ( "data-source"));
  const componentAttr = options.componentAttribute === void 0 ? "data-component" : options.componentAttribute;
  const path = escapeAttr(displayPath(file, _nullishCoalesce(options.root, () => ( process.cwd()))));
  const s = new (0, _magicstring2.default)(code);
  let changed = false;
  const visit = (node, component, hint) => {
    let inner = component;
    switch (node.type) {
      case "FunctionDeclaration":
      case "ClassDeclaration":
      case "FunctionExpression":
      case "ClassExpression":
      case "ArrowFunctionExpression": {
        const own = _nullishCoalesce(_optionalChain([node, 'access', _ => _.id, 'optionalAccess', _2 => _2.name]), () => ( hint));
        if (isComponentName(own)) inner = own;
        break;
      }
      case "JSXOpeningElement": {
        const tag = hostTagName(node);
        if (tag && typeof node.end === "number") {
          const nameEnd = node.name.end;
          const loc = node.loc;
          let insert = "";
          if (loc && !hasAttribute(node, sourceAttr)) insert += ` ${sourceAttr}="${path}:${loc.start.line}:${loc.start.column + 1}"`;
          if (componentAttr && component && !hasAttribute(node, componentAttr)) insert += ` ${componentAttr}="${component}"`;
          if (insert) {
            s.appendLeft(nameEnd, insert);
            changed = true;
          }
        }
        break;
      }
    }
    for (const key of Object.keys(node)) {
      if (SKIP_KEYS.has(key)) continue;
      const value = node[key];
      let childHint;
      if (node.type === "VariableDeclarator" && key === "init") childHint = node.id.name;
      else if (node.type === "CallExpression" && key === "arguments") childHint = hint;
      else if (node.type === "AssignmentExpression" && key === "right") childHint = node.left.name;
      else if ((node.type === "TSAsExpression" || node.type === "TSSatisfiesExpression") && key === "expression") childHint = hint;
      if (Array.isArray(value)) {
        for (const child of value) if (isNode(child)) visit(child, inner, childHint);
      } else if (isNode(value)) {
        visit(value, inner, childHint);
      }
    }
  };
  visit(ast, void 0, void 0);
  if (!changed) return null;
  return { code: s.toString(), map: s.generateMap({ source: file, includeContent: true, hires: "boundary" }) };
}









exports.importMetaUrl = importMetaUrl; exports.DEFAULT_INCLUDE = DEFAULT_INCLUDE; exports.DEFAULT_EXCLUDE = DEFAULT_EXCLUDE; exports.cleanId = cleanId; exports.shouldTransform = shouldTransform; exports.displayPath = displayPath; exports.transformSource = transformSource;
