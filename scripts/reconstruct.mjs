import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import * as t from "@babel/types";
import prettier from "prettier";
const traverse = traverseModule.default,
  generate = generateModule.default;
const root = process.cwd(),
  check = process.argv.includes("--check");
const sha = (x) => createHash("sha256").update(x).digest("hex");
const manifest = JSON.parse(await readFile("reference/manifest.json"));
const outputs = new Map(),
  mapping = new Map(),
  report = {
    sourceManifestSha256: sha(await readFile("reference/manifest.json")),
    modules: {},
    extractions: {},
    adaptations: [],
  };
const parseModule = (s) =>
  parse(s, { sourceType: "module", createImportExpressions: true });
const clean = (key, value) =>
  [
    "start",
    "end",
    "loc",
    "extra",
    "comments",
    "leadingComments",
    "trailingComments",
    "innerComments",
  ].includes(key)
    ? undefined
    : value;
const canonical = (n) => JSON.stringify(n, clean);
const banner =
  "// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.\n";
for (const record of manifest.files) {
  const bytes = await readFile("reference/" + record.path);
  if (bytes.length !== record.bytes || sha(bytes) !== record.sha256)
    throw Error("Capture integrity failure: " + record.path);
  if (!record.path.endsWith(".js")) continue;
  const name = path.basename(record.path),
    stem = name.split("-")[0];
  const target =
    {
      index: "localization.js",
      main: "app.js",
      stage: "scene.js",
      kit: "models.js",
      thumbs: "thumbnails.js",
    }[stem] ?? "locales/" + stem + ".js";
  if ([...mapping.values()].includes(target))
    throw Error("Duplicate module target " + target);
  mapping.set(name, target);
  report.modules[name] = target;
}
function rewriteImports(source, target) {
  const ast = parseModule(source);
  const replace = (node) => {
    const value = t.isStringLiteral(node)
      ? node.value
      : t.isTemplateLiteral(node) && node.expressions.length === 0
        ? node.quasis[0].value.cooked
        : null;
    if (!value) return;
    const mapped = mapping.get(path.posix.basename(value));
    if (!mapped) return;
    const relative = path.posix.relative(path.posix.dirname(target), mapped);
    const next = relative.startsWith(".") ? relative : "./" + relative;
    if (t.isStringLiteral(node)) node.value = next;
    else node.quasis[0].value = { raw: next, cooked: next };
  };
  traverse(ast, {
    ImportDeclaration: (p) => replace(p.node.source),
    ExportNamedDeclaration: (p) => p.node.source && replace(p.node.source),
    ExportAllDeclaration: (p) => replace(p.node.source),
    ImportExpression: (p) => replace(p.node.source),
  });
  return ast;
}
async function emitModule(target, ast) {
  const code =
    banner +
    (await prettier.format(generate(ast, { comments: true }).code, {
      parser: "babel",
      quoteProps: "preserve",
    }));
  outputs.set("src/recovered/" + target, code);
}
const owner = new Map(),
  groups = [];
function group(file, exports) {
  groups.push({ file, exports, nodes: [] });
  for (const [name, exported] of Object.entries(exports)) {
    if (owner.has(name)) throw Error("Duplicate extraction " + name);
    owner.set(name, { file, exported });
  }
}
group("lesson-data.js", {
  l: "boardSpecifications",
  u: "ledColourControl",
  d: "obstacleControls",
  f: "colourPresets",
  p: "noteFrequencies",
  m: "pianoMelodies",
  h: "formatArrayRows",
  ee: "lessons",
});
group("signals.js", { ot: "powerPins", A: "pinSignal" });
group("audio.js", {
  N: "audioContext",
  P: "continuousVoice",
  yt: "unlockAudio",
  bt: "playTone",
  xt: "continuousTone",
  St: "stopTone",
});
group("icons.js", { fe: "iconPaths", b: "renderIcon" });
group("callouts.js", {
  pe: "svgNamespace",
  me: "ringMargin",
  x: "createSvg",
  he: "calloutAnchor",
  ge: "leaderApproach",
  _e: "CalloutLayer",
});
group("lesson-info.js", {
  S: "infoTabs",
  ve: "renderInfoTab",
  ye: "LessonInfo",
});
group("sketch-highlight.js", {
  be: "keywords",
  xe: "constants",
  Se: "tokenMarker",
  Ce: "tokenPattern",
  we: "rtlPattern",
  C: "escapeHtml",
  Te: "highlightLine",
  Ee: "highlightSketch",
});
group("code-panel.js", { w: "serialMinimumHeight", De: "CodePanel" });
group("lesson-navigation.js", {
  Oe: "thumbnailWidths",
  ke: "lessonCardWidths",
  Ae: "navigationIcon",
  je: "LessonNavigation",
});
group("inspector.js", {
  Be: "svgNamespace",
  Ve: "inspectorMargin",
  He: "interactionHints",
  Ue: "formatParameter",
  We: "ComponentInspector",
});
group("sidebar.js", { Me: "languageName", Ne: "Sidebar" });
group("view-controls.js", { Pe: "ViewControls" });
group("minimap.js", {
  Fe: "partColours",
  Ie: "fallbackColours",
  Le: "mapWidth",
  Re: "mapHeight",
  ze: "Minimap",
});
group("signal-overlay.js", { Ke: "labelFractions", qe: "SignalOverlay" });
group("loader.js", { Ge: "LoadingScreen" });
group("schematic.js", {
  at: "circuits",
  ct: "symbolWidths",
  j: "rowGap",
  lt: "wireGap",
  ut: "boardWidth",
  dt: "leftMargin",
  ft: "rightMargin",
  pt: "pwmPins",
  mt: "resolveValue",
  M: "escapeAttribute",
  ht: "pinLabel",
  gt: "renderSymbol",
  _t: "renderCircuit",
  st: "signalStrength",
  vt: "Schematic",
});
for (const [name, exported] of Object.entries({
  _: "createDefaultParameters",
  v: "resolveOptionCode",
  te: "interpolateSketch",
}))
  owner.set(name, { file: "../sketch/template.js", exported, authored: true });
for (const [original, target] of mapping) {
  const source = await readFile("reference/site/assets/" + original, "utf8");
  const ast = rewriteImports(source, target);
  if (target === "localization.js") {
    const polyfill = ast.program.body.shift();
    if (
      !t.isExpressionStatement(polyfill) ||
      !t.isCallExpression(polyfill.expression)
    )
      throw Error("Preload polyfill drift");
    const boots = ast.program.body.filter(
      (n) => t.isExpressionStatement(n) && generate(n).code.includes("import("),
    );
    if (boots.length !== 1) throw Error("Bootstrap count drift");
    ast.program.body = ast.program.body.filter((n) => n !== boots[0]);
    const boot = parseModule(
      "import {initializeLanguage, s as preload} from './localization.js'; initializeLanguage().then(ready => ready && preload(() => import('./app.js').then(module => module.t), []));",
    );
    boot.program.body.unshift(polyfill);
    await emitModule("bootstrap.js", boot);
    let g = 0,
      u = 0,
      b = 0;
    traverse(ast, {
      FunctionDeclaration(p) {
        if (p.node.id.name === "g") {
          p.node.body.body.unshift(
            ...parseModule("e = relativeAppPath(e, import.meta.env.BASE_URL);")
              .program.body,
          );
          g++;
        }
        if (p.node.id.name === "_") {
          p.node.body = parseModule(
            "function route(){return localePath(e,import.meta.env.BASE_URL,location.search,location.hash)}",
          ).program.body[0].body;
          u++;
        }
      },
      BinaryExpression(p) {
        if (
          p.node.operator === "===" &&
          generate(p.node.left).code === "location.pathname" &&
          t.isTemplateLiteral(p.node.right) &&
          p.node.right.quasis[0].value.cooked === "/"
        ) {
          p.node.left = parseModule(
            "relativeAppPath(location.pathname, import.meta.env.BASE_URL)",
          ).program.body[0].expression;
          b++;
        }
      },
    });
    if (g !== 1 || u !== 1 || b !== 1) throw Error("Locale routing drift");
    ast.program.body.unshift(
      ...parseModule(
        "import {relativeAppPath,localePath} from '../runtime/routes.js';",
      ).program.body,
    );
    ast.program.body.push(
      t.exportNamedDeclaration(null, [
        t.exportSpecifier(
          t.identifier("b"),
          t.identifier("initializeLanguage"),
        ),
      ]),
    );
    report.adaptations.push(
      "Separate bootstrap side effects from shared localization; three counted base-path routing adaptations.",
    );
  }
  if (target === "app.js") {
    let program;
    traverse(ast, {
      Program(p) {
        program = p;
        p.stop();
      },
    });
    const dependencies = new Map(),
      originalNodes = new Map(),
      originalImports = new Map();
    for (const [name, binding] of Object.entries(program.scope.bindings)) {
      if (binding.path.isImportSpecifier()) {
        originalImports.set(name, {
          source: binding.path.parent.source.value,
          imported: binding.path.node.imported.name,
        });
        continue;
      }
      originalNodes.set(name, binding.path.node);
      const refs = new Set();
      binding.path.traverse({
        ReferencedIdentifier(p) {
          const b = p.scope.getBinding(p.node.name);
          if (b && b.scope === program.scope && p.node.name !== name)
            refs.add(p.node.name);
        },
      });
      dependencies.set(name, refs);
    }
    // Close schematic constant/helper dependencies, rejecting accidental app state.
    const schematic = groups.find((g) => g.file === "schematic.js");
    const pending = [...Object.keys(schematic.exports)];
    while (pending.length) {
      for (const dep of dependencies.get(pending.pop()) ?? []) {
        if (owner.has(dep) || originalImports.has(dep)) continue;
        const node = originalNodes.get(dep);
        if (
          !node ||
          t.isClassExpression(node.init) ||
          generate(node).code.includes("F(`#")
        )
          throw Error("Unexpected schematic dependency " + dep);
        owner.set(dep, { file: schematic.file, exported: dep });
        schematic.exports[dep] = dep;
        pending.push(dep);
      }
    }
    const seen = new Map();
    const body = [];
    for (const node of ast.program.body) {
      if (t.isVariableDeclaration(node)) {
        const keep = [];
        for (const d of node.declarations) {
          const name = d.id.name;
          if (owner.has(name)) {
            seen.set(name, (seen.get(name) ?? 0) + 1);
            const g = groups.find((g) => g.file === owner.get(name).file);
            if (g) g.nodes.push(t.variableDeclaration(node.kind, [d]));
          } else {
            if (name === "__vite__mapDeps") {
              d.init = parseModule("()=>[]").program.body[0].expression;
              report.adaptations.push(
                "Discard original Vite preload hash list; rebuilt imports own dependency loading.",
              );
            }
            keep.push(d);
          }
        }
        if (keep.length) body.push(t.variableDeclaration(node.kind, keep));
      } else if (t.isFunctionDeclaration(node) && owner.has(node.id.name)) {
        const name = node.id.name;
        seen.set(name, (seen.get(name) ?? 0) + 1);
        const g = groups.find((g) => g.file === owner.get(name).file);
        if (g) g.nodes.push(node);
      } else body.push(node);
    }
    for (const [name, value] of owner) {
      if (seen.get(name) !== 1) throw Error("Extraction binding drift " + name);
      report.extractions[name] = {
        ...value,
        originalAstSha256: sha(canonical(originalNodes.get(name))),
      };
    }
    function importList(names, ownFile) {
      const imports = new Map();
      for (const name of names) {
        let source, imported;
        const info = owner.get(name);
        if (info) {
          if (info.file === ownFile) continue;
          source = info.file.startsWith("../") ? info.file : "./" + info.file;
          imported = info.exported;
        } else if (originalImports.has(name)) {
          ({ source, imported } = originalImports.get(name));
        } else
          throw Error("Unclosed module dependency " + ownFile + " -> " + name);
        if (!imports.has(source)) imports.set(source, []);
        imports
          .get(source)
          .push(t.importSpecifier(t.identifier(name), t.identifier(imported)));
      }
      return [...imports].map(([source, specs]) =>
        t.importDeclaration(specs, t.stringLiteral(source)),
      );
    }
    for (const g of groups) {
      const deps = new Set();
      for (const name of Object.keys(g.exports))
        for (const dep of dependencies.get(name) ?? []) deps.add(dep);
      const module = t.file(
        t.program([
          ...importList(deps, g.file),
          ...g.nodes,
          t.exportNamedDeclaration(
            null,
            Object.entries(g.exports).map(([name, out]) =>
              t.exportSpecifier(t.identifier(name), t.identifier(out)),
            ),
          ),
        ]),
      );
      await emitModule(g.file, module);
    }
    ast.program.body = [...importList(owner.keys(), "app.js"), ...body];
  }
  if (target === "scene.js") {
    const sources = {
      a: ["signals.js", "powerPins"],
      c: ["lesson-data.js", "pianoMelodies"],
      i: ["audio.js", "continuousTone"],
      n: ["audio.js", "playTone"],
      o: ["signals.js", "pinSignal"],
      r: ["audio.js", "stopTone"],
      s: ["lesson-data.js", "noteFrequencies"],
    };
    const body = [];
    for (const node of ast.program.body) {
      if (t.isImportDeclaration(node) && node.source.value === "./app.js") {
        for (const spec of node.specifiers) {
          const info = sources[spec.imported.name];
          if (!info)
            throw Error("Scene app import drift " + spec.imported.name);
          body.push(
            t.importDeclaration(
              [t.importSpecifier(spec.local, t.identifier(info[1]))],
              t.stringLiteral("./" + info[0]),
            ),
          );
        }
      } else body.push(node);
    }
    ast.program.body = body;
    let replaced = 0;
    for (const node of ast.program.body) {
      if (t.isVariableDeclaration(node))
        node.declarations = node.declarations.filter(
          (d) => !["Ss", "Cs", "ws"].includes(d.id.name),
        );
      if (t.isFunctionDeclaration(node) && node.id.name === "Ds") {
        node.body = parseModule(
          'function texture(){const canvas=document.createElement("canvas");canvas.width=canvas.height=1;const tex=new Ke(canvas);tex.colorSpace=Qe;tex.anisotropy=8;return {tex,aspect:1};}',
        ).program.body[0].body;
        replaced++;
      }
    }
    if (replaced !== 1) throw Error("Floor presentation texture drift");
    ast.program.body = ast.program.body.filter(
      (n) => !t.isVariableDeclaration(n) || n.declarations.length,
    );
    report.adaptations.push(
      "Transparent floor signature texture; original mesh, fade and disposal lifecycle retained.",
    );
  }
  await emitModule(target, ast);
}
for (const record of manifest.files) {
  const rel = record.path.replace(/^site\//, "");
  const bytes = await readFile("reference/" + record.path);
  if (rel.endsWith(".html")) {
    let html = bytes.toString();
    let credits = 0;
    html = html.replace(
      /<a class="credit credit-(side|row)"[\s\S]*?<\/a>/g,
      (_match, place) => {
        credits++;
        return `<span class="credit credit-${place}" aria-hidden="true"></span>`;
      },
    );
    if (credits !== 2)
      throw Error("Presentation markup drift " + rel + ": " + credits);
    html = html.replace(
      /<script type="module" crossorigin src="\/assets\/index-[^"]+"><\/script>/,
      '<script type="module" src="/src/recovered/bootstrap.js"></script>',
    );
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+">/,
      '<link rel="stylesheet" href="/src/style.css">',
    );
    html = html.replace(
      /\s*<meta name="(?:author|twitter:creator)"[^>]*\/?\s*>/g,
      "",
    );
    html = html.replace(
      /,"author":\{"@type":"Person","name":"Dilum Sanjaya","url":"https:\/\/x.com\/DilumSanjaya"\}/g,
      "",
    );
    // Vite replaces BASE_URL in HTML assets and navigation for root/prefixed builds.
    html = html.replace(
      /(href|src)="\/(?!src\/)([^"]*)"/g,
      '$1="%BASE_URL%$2"',
    );
    outputs.set(rel, html);
  } else if (rel.endsWith(".css")) {
    const css = bytes.toString().replaceAll("./assets/", "/assets/");
    outputs.set(
      "src/style.css",
      "/* Generated from fresh original styling. */\n" +
        (await prettier.format(css, { parser: "css" })),
    );
  } else if (!rel.endsWith(".js")) {
    // Metadata routes for the original domain stay evidence-only; build emits local manifest.
    if (["robots.txt", "sitemap.xml", "site.webmanifest"].includes(rel))
      continue;
    outputs.set("public/" + rel, bytes);
  }
}
outputs.set(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "Learn Arduino",
      short_name: "Arduino",
      start_url: "./",
      scope: "./",
      display: "standalone",
      background_color: "#e8dfce",
      theme_color: "#e8dfce",
      icons: [
        { src: "icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);
report.adaptations.push(
  "Blank presentation credit placeholders retain sidebar measurement anchors; author metadata omitted. Root/localized HTML asset URLs and webmanifest are base-relative.",
);
outputs.set(
  "docs/reconstruction/recovery-map.json",
  JSON.stringify(report, null, 2) + "\n",
);
for (const [file, data] of outputs) {
  const bytes = Buffer.from(data);
  if (check) {
    const current = await readFile(file).catch(() => null);
    if (!current?.equals(bytes)) throw Error("Generated output drift: " + file);
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, bytes);
  }
}
console.log(
  JSON.stringify({
    mode: check ? "verified" : "generated",
    files: outputs.size,
    originalModules: mapping.size,
    extractedBindings: owner.size,
    lessons: 16,
  }),
);
