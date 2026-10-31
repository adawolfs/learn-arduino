import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parse } from "@babel/parser";
import { createHash } from "node:crypto";
import { relativeAppPath, localePath } from "../src/runtime/routes.js";
const manifest = JSON.parse(fs.readFileSync("reference/manifest.json"));
const report = JSON.parse(
  fs.readFileSync("docs/reconstruction/recovery-map.json"),
);
const canonical = (node) => {
  const n = structuredClone(node);
  function walk(v) {
    if (!v || typeof v !== "object") return;
    if (v.type === "ImportExpression") {
      const s = v.source;
      const value =
        s.type === "StringLiteral" ? s.value : s.quasis?.[0]?.value.cooked;
      const mapped = report.modules[value?.split("/").at(-1)];
      if (mapped) {
        const name = "./" + mapped;
        if (s.type === "StringLiteral") s.value = name;
        else s.quasis[0].value = { raw: name, cooked: name };
      }
    }
    for (const value of Object.values(v)) {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") walk(value);
    }
  }
  walk(n);
  return createHash("sha256")
    .update(
      JSON.stringify(n, (k, v) =>
        [
          "start",
          "end",
          "loc",
          "extra",
          "comments",
          "leadingComments",
          "trailingComments",
          "innerComments",
        ].includes(k)
          ? undefined
          : v,
      ),
    )
    .digest("hex");
};
function declarations(source) {
  const ast = parse(source, {
    sourceType: "module",
    createImportExpressions: true,
  });
  const map = new Map();
  for (const n of ast.program.body) {
    if (n.type === "VariableDeclaration")
      for (const d of n.declarations) map.set(d.id.name, d);
    if (n.type === "FunctionDeclaration" || n.type === "ClassDeclaration")
      map.set(n.id.name, n);
  }
  return map;
}
const modules = new Map();
function recovered(name) {
  if (!modules.has(name))
    modules.set(
      name,
      declarations(fs.readFileSync("src/recovered/" + name, "utf8")),
    );
  return modules.get(name);
}
test("every recovered app binding retains the original executable AST except explicit adaptations", () => {
  const source = manifest.files.find((r) => /\/main-.*\.js$/.test(r.path));
  const original = declarations(
    fs.readFileSync("reference/" + source.path, "utf8"),
  );
  let compared = 0;
  for (const [name, node] of original) {
    if (["__vite__mapDeps", "_", "te", "v"].includes(name)) continue;
    const owner = report.extractions[name]?.file ?? "app.js";
    assert.equal(
      canonical(recovered(owner).get(name)),
      canonical(node),
      name + " in " + owner,
    );
    compared++;
  }
  assert.ok(compared > 150);
});
test("all original model geometry and scene bindings retain their executable AST", () => {
  for (const [stem, target, except] of [
    ["kit", "models.js", []],
    ["stage", "scene.js", ["Ss", "Cs", "ws", "Ds"]],
  ]) {
    const source = manifest.files.find((r) =>
      new RegExp("/" + stem + "-.*\\.js$").test(r.path),
    );
    const original = declarations(
      fs.readFileSync("reference/" + source.path, "utf8"),
    );
    let compared = 0;
    for (const [name, node] of original) {
      if (except.includes(name)) continue;
      assert.equal(
        canonical(recovered(target).get(name)),
        canonical(node),
        stem + ":" + name,
      );
      compared++;
    }
    assert.ok(compared > 100);
  }
});
test("locale routing preserves root behavior and adds repository-prefix support", () => {
  for (const base of ["/", "/learn-arduino-private/"])
    for (const code of ["en", "es", "he"]) {
      const expected = base + (code === "en" ? "" : code + "/");
      assert.equal(
        localePath(code, base, "?mode=test", "#blink"),
        expected + "?mode=test#blink",
      );
      assert.equal(
        relativeAppPath(expected, base),
        code === "en" ? "/" : "/" + code + "/",
      );
    }
  assert.equal(
    relativeAppPath("/learn-arduino-private", "/learn-arduino-private/"),
    "/",
  );
  assert.equal(
    relativeAppPath("/outside/", "/learn-arduino-private/"),
    "/outside/",
  );
});
test("immutable evidence retains presentation; active output removes it while retaining layout anchor", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(
    html,
    /<span class="credit credit-side" aria-hidden="true"><\/span>/,
  );
  assert.doesNotMatch(html, /x\.com\/DilumSanjaya/);
  assert.match(
    fs.readFileSync("reference/site/index.html", "utf8"),
    /x\.com\/DilumSanjaya/,
  );
  assert.doesNotMatch(
    fs.readFileSync("src/recovered/scene.js", "utf8"),
    /x\.com\/DilumSanjaya/,
  );
});
