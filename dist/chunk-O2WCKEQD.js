// ../../node_modules/.pnpm/tsup@9.0.0_postcss@8.5.32_typescript@7.0.2/node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/transform.ts
import { parse } from "@babel/parser";
import MagicString from "magic-string";
import { isAbsolute, relative, sep } from "path";
var DEFAULT_INCLUDE = /\.(?:m?jsx?|tsx)$/;
var DEFAULT_EXCLUDE = /[\\/]node_modules[\\/]/;
function cleanId(id) {
  return id.replace(/[?#].*$/, "");
}
function shouldTransform(id, options = {}) {
  if (id.startsWith("\0")) return false;
  const file = cleanId(id);
  return (options.include ?? DEFAULT_INCLUDE).test(file) && !(options.exclude ?? DEFAULT_EXCLUDE).test(file);
}
function parserPlugins(file) {
  if (/\.tsx$/.test(file)) return ["jsx", "typescript"];
  if (/\.[cm]?ts$/.test(file)) return ["typescript"];
  return ["jsx"];
}
function displayPath(file, root) {
  const rel = isAbsolute(file) ? relative(root, file) : file;
  return rel.split(sep).join("/");
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
    ast = parse(code, { sourceType: "module", plugins, errorRecovery: true });
  } catch {
    return null;
  }
  const sourceAttr = options.sourceAttribute ?? "data-source";
  const componentAttr = options.componentAttribute === void 0 ? "data-component" : options.componentAttribute;
  const path2 = escapeAttr(displayPath(file, options.root ?? process.cwd()));
  const s = new MagicString(code);
  let changed = false;
  const visit = (node, component, hint) => {
    let inner = component;
    switch (node.type) {
      case "FunctionDeclaration":
      case "ClassDeclaration":
      case "FunctionExpression":
      case "ClassExpression":
      case "ArrowFunctionExpression": {
        const own = node.id?.name ?? hint;
        if (isComponentName(own)) inner = own;
        break;
      }
      case "JSXOpeningElement": {
        const tag = hostTagName(node);
        if (tag && typeof node.end === "number") {
          const nameEnd = node.name.end;
          const loc = node.loc;
          let insert = "";
          if (loc && !hasAttribute(node, sourceAttr)) insert += ` ${sourceAttr}="${path2}:${loc.start.line}:${loc.start.column + 1}"`;
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

export {
  __dirname,
  DEFAULT_INCLUDE,
  DEFAULT_EXCLUDE,
  cleanId,
  shouldTransform,
  displayPath,
  transformSource
};
