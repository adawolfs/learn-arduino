# Arduino preservation-first restart implementation plan

> Use superpowers:executing-plans; implement inline and request one fresh whole-change reviewer.

**Goal:** Fresh captured Arduino course plus a faithful maintainable reconstruction delivered to the private repository.
**Architecture:** Immutable public deployment, independent preservation server, named recovered modules, authored pure boundaries with differential tests. Old Arduino application is donor evidence only.
**Tech Stack:** Python 3 standard library, Node 24, pinned Vite/Babel/Prettier.
**Spec:** ../specs/2026-10-31-arduino-restart-design.md

## Global constraints

Retain private Git history and old checkout; no force push or public remote. Preserve exact reference bytes/notices. All 16 original lessons and deployed locales. No independent replacement geometry or UI/session engine. Explicit adaptation report and source ownership.

## Review focus

- Dynamic imports and locale/font paths under root and repository prefixes must close locally.
- Circular app/scene/model dependencies must share original singleton state.
- Inspector parameter changes must drive the same code, schematic and simulation.
- Captured data and generated outputs must fail closed on source drift.
- Runtime signature removal must not alter model lifecycle or produce duplicate Three instances.

## Task 1 — Fresh preservation

Files: scripts/capture.py, scripts/serve-preserved.py, tests/test_capture.py, reference/manifest.json, reference/site.
Interfaces: manifest files with url/path/bytes/sha256/content_type; exact files under reference/site.
- [x] Write failing URL-scope, fallback and module-discovery tests, then implement guarded same-origin capture (reuse reviewed BenchTwin tooling where applicable).
- [x] Capture root and all discovered static imports/CSS/fonts/locales; inspect failures and source-map availability. Verify every byte/hash and dependency edge.
- [x] Serve immutable capture on loopback and inspect original rendering and menus. Commit preservation checkpoint.

## Task 2 — Faithful source reconstruction

Files: scripts/reconstruct.mjs, src/recovered/*, src/sketch/*, src/models.js, index.html, src/style.css, public/*, tests/reconstruction.test.mjs, tests/sketch.test.mjs.
Interfaces: generator verifies manifest, maps each module to descriptive path, emits reproducible outputs and ownership report. Authored pure modules remain generator inputs.
- [x] Write failing capture integrity/generation/import closure tests. Recover named modules retaining original code, CSS and models.
- [x] Extract lesson definitions and shared runtime singletons from bootstrap after identifying exact bindings. Count transformations and reject drift.
- [x] Promote compatible pure sketch/template helpers with differential tests against capture, preserving original call shapes and session values.
- [x] Verify generated AST boundaries and regeneration, root/prefix builds and original-vs-reconstruction interaction/animation/lesson coverage. Commit reconstruction checkpoint.

## Task 3 — Delivery

Files: README.md, AGENTS.md, docs/reconstruction/*, docs/VERIFICATION.md, docs/PROGRESS.md.
- [x] Document donor decisions, original/procedural model ownership, extension/refactor path, verification coverage and known limits.
- [x] Independent review; reproduce/fix Important findings in one regression-tested pass.
- [x] Publish the complete verified fresh implementation to the requested private repository with normal commits and non-force push; verify remote SHA. Preserve local preview.
