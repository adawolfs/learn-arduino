import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { parse } from "@babel/parser";
import { lessons } from "../src/recovered/lesson-data.js";
const manifest = JSON.parse(fs.readFileSync("reference/manifest.json"));
test("fresh captured bytes match every provenance record", () => {
  for (const r of manifest.files) {
    const bytes = fs.readFileSync("reference/" + r.path);
    assert.equal(bytes.length, r.bytes);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      r.sha256,
      r.path,
    );
  }
});
test("all original lessons are preserved in their original order", () => {
  assert.deepEqual(
    lessons.map((x) => x.id),
    [
      "board",
      "blink",
      "button",
      "knob",
      "rgb",
      "light",
      "sensor",
      "sound",
      "piano",
      "motor",
      "heat",
      "servo",
      "stepper",
      "plant",
      "force",
      "project",
    ],
  );
  assert.equal(new Set(lessons.map((x) => x.id)).size, 16);
});
test("all static and dynamic ES module imports resolve locally", () => {
  function visit(n, cb) {
    if (!n || typeof n !== "object") return;
    cb(n);
    for (const [k, v] of Object.entries(n)) {
      if (["loc", "extra", "comments"].includes(k)) continue;
      if (Array.isArray(v)) v.forEach((x) => visit(x, cb));
      else if (v && typeof v === "object") visit(v, cb);
    }
  }
  const files = fs
    .readdirSync("src", { recursive: true })
    .filter((x) => x.endsWith(".js"));
  for (const rel of files) {
    const file = path.join("src", rel);
    const ast = parse(fs.readFileSync(file, "utf8"), {
      sourceType: "module",
      createImportExpressions: true,
    });
    visit(ast, (n) => {
      if (
        ![
          "ImportDeclaration",
          "ExportNamedDeclaration",
          "ExportAllDeclaration",
          "ImportExpression",
        ].includes(n.type) ||
        !n.source
      )
        return;
      const s =
        n.source.type === "StringLiteral"
          ? n.source.value
          : n.source.type === "TemplateLiteral" &&
              n.source.expressions.length === 0
            ? n.source.quasis[0].value.cooked
            : null;
      assert.ok(s, "computed import must be reviewed: " + file);
      assert.ok(s.startsWith("."), s);
      assert.ok(
        fs.existsSync(path.resolve(path.dirname(file), s)),
        file + " -> " + s,
      );
    });
  }
});
test("models and scene do not import application bootstrap", () => {
  for (const file of [
    "models.js",
    "scene.js",
    "localization.js",
    "audio.js",
    "signals.js",
  ]) {
    const text = fs.readFileSync("src/recovered/" + file, "utf8");
    assert.doesNotMatch(text, /from ["'`]\.\/app\.js["'`]/);
  }
});
