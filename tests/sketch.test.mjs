import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { parse } from "@babel/parser";
import generateModule from "@babel/generator";
import {
  createDefaultParameters,
  resolveOptionCode,
  interpolateSketch,
} from "../src/sketch/template.js";
import { lessons } from "../src/recovered/lesson-data.js";
const generate = generateModule.default;
const manifest = JSON.parse(fs.readFileSync("reference/manifest.json"));
const entry = manifest.files.find((r) => /\/main-.*\.js$/.test(r.path));
const ast = parse(fs.readFileSync("reference/" + entry.path, "utf8"), {
  sourceType: "module",
});
const functions = ast.program.body.filter(
  (n) =>
    n.type === "FunctionDeclaration" && ["_", "v", "te"].includes(n.id.name),
);
assert.equal(functions.length, 3);
const oracle = vm.runInNewContext(
  functions.map((n) => generate(n).code).join("\n") +
    ";({defaults:_,options:v,sketch:te})",
);
test("authored donor sketch helpers match fresh original across all lessons and controls", () => {
  let variants = 0;
  for (const lesson of lessons) {
    const base = createDefaultParameters(lesson);
    assert.deepEqual(base, JSON.parse(JSON.stringify(oracle.defaults(lesson))));
    const cases = [base];
    for (const p of lesson.params ?? []) {
      for (const value of p.options?.map((o) => o.value) ?? [
        p.min,
        p.max,
        0,
        false,
        "",
        null,
      ])
        cases.push({ ...base, [p.key]: value });
    }
    for (const values of cases) {
      assert.equal(
        resolveOptionCode(lesson, values),
        oracle.options(lesson, values),
      );
      assert.equal(
        interpolateSketch(lesson, values),
        oracle.sketch(lesson, values),
      );
      variants++;
    }
  }
  assert.ok(variants > 100);
});
test("strict choice values, falsy scalars and missing fields retain captured behavior", () => {
  const l = {
    code: "{{mode.body}} {{n}} {{b}} {{missing}}",
    params: [{ key: "mode", options: [{ value: 1, code: { body: "one" } }] }],
  };
  for (const values of [
    { mode: 1, n: 0, b: false },
    { mode: "1", n: null, b: "" },
    {},
  ])
    assert.equal(interpolateSketch(l, values), oracle.sketch(l, values));
});
