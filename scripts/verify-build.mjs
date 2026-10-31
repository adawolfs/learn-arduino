import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
const traverse = traverseModule.default;
const directory = process.argv[2] ?? "dist";
const base = process.argv[3] ?? "/";
const root = path.resolve(directory);
let files = 0,
  edges = 0,
  pages = 0;
function check(value, from) {
  if (!value || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return;
  const clean = decodeURIComponent(value.split(/[?#]/)[0]);
  if (!clean) return;
  let relative;
  if (clean.startsWith("/")) {
    assert.ok(
      clean.startsWith(base),
      `${from}: path escapes deployment base: ${value}`,
    );
    relative = clean.slice(base.length);
  } else relative = path.posix.join(path.posix.dirname(from), clean);
  const target = path.resolve(root, relative);
  assert.ok(
    target === root || target.startsWith(root + path.sep),
    "path escape",
  );
  assert.ok(fs.existsSync(target), `${from}: missing ${value}`);
  edges++;
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      files++;
      const rel = path.relative(root, full).replaceAll("\\", "/");
      const ext = path.extname(rel);
      if (![".html", ".js", ".css", ".webmanifest"].includes(ext)) continue;
      const source = fs.readFileSync(full, "utf8");
      if (ext === ".html") {
        pages++;
        assert.ok(!source.includes("%BASE_URL%"));
        for (const m of source.matchAll(/(?:src|href)="([^\"]+)"/g))
          check(m[1], rel);
      }
      if (ext === ".css")
        for (const m of source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g))
          check(m[1], rel);
      if (ext === ".js") {
        const ast = parse(source, {
          sourceType: "module",
          createImportExpressions: true,
        });
        const reference = (n) => {
          if (n?.type === "StringLiteral") check(n.value, rel);
          else if (n?.type === "TemplateLiteral" && n.expressions.length === 0)
            check(n.quasis[0].value.cooked, rel);
        };
        traverse(ast, {
          ImportDeclaration: (p) => reference(p.node.source),
          ExportNamedDeclaration: (p) => reference(p.node.source),
          ExportAllDeclaration: (p) => reference(p.node.source),
          ImportExpression: (p) => reference(p.node.source),
        });
      }
      if (ext === ".webmanifest") {
        const m = JSON.parse(source);
        check(m.start_url, rel);
        check(m.scope, rel);
        for (const icon of m.icons) check(icon.src, rel);
      }
    }
  }
}
assert.ok(base.startsWith("/") && base.endsWith("/"));
walk(root);
assert.equal(pages, 13);
console.log(
  JSON.stringify({ directory, base, files, pages, verifiedReferences: edges }),
);
