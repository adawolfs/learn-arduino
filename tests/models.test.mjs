import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parse } from "@babel/parser";
const exportsOf = (source) =>
  parse(source, { sourceType: "module" })
    .program.body.filter((n) => n.type === "ExportNamedDeclaration")
    .flatMap((n) => n.specifiers)
    .map((s) => [s.local.name, s.exported.name]);
test("semantic model facade resolves all 52 APIs to captured factory exports", () => {
  const manifest = JSON.parse(fs.readFileSync("reference/manifest.json"));
  const kit = manifest.files.find((x) => /\/kit-.*\.js$/.test(x.path));
  const actual = new Map(
    exportsOf(fs.readFileSync("reference/" + kit.path, "utf8")),
  );
  const facade = new Map(
    exportsOf(fs.readFileSync("src/models.js", "utf8")).map(([alias, name]) => [
      name,
      alias,
    ]),
  );
  const map = JSON.parse(
    fs.readFileSync("docs/reconstruction/model-exports.json"),
  );
  assert.equal(Object.keys(map).length, 52);
  assert.equal(facade.size, 52);
  for (const [name, entry] of Object.entries(map)) {
    assert.equal(
      actual.get(entry.originalBinding),
      entry.recoveredExport,
      name,
    );
    assert.equal(facade.get(name), entry.recoveredExport, name);
  }
});
