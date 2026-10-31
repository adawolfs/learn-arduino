# Agent context: fresh Arduino preservation and reconstruction

This tree is the 2026-10-31 capture-first restart, not the earlier Arduino rewrite. Read README.md, docs/reconstruction/README.md and docs/VERIFICATION.md first. The current original deployment and tests are the authority.

- Never mutate `reference/site`, its manifest, or captured provenance to fix the app. A new capture belongs in a separate reviewed location.
- `src/recovered`, HTML, style.css and public assets are generated. Change the guarded AST recipe in scripts/reconstruct.mjs, regenerate and run `verify:source`.
- Authored source: src/sketch/template.js, src/runtime/routes.js, src/models.js. Promote one small boundary at a time with differential tests against immutable original code.
- Preserve shared original session/audio/signal state, model/scene ownership, physical inputs and transitions. Do not introduce a second Three runtime or independent simulation state.
- `src/models.js` re-exports original factory objects. It is an API, not a replacement renderer. New models must be integrated into the active scene factory/lesson paths, with wiring, picking, inspector, sketch and simulation synchronized.
- All 16 lessons and 13 language entry pages must remain runnable. Preserve root and arbitrary Vite base support.
- Keep license comments and provenance. Presentation signatures are omitted only from the active reconstruction; original evidence is exact.
- Node 24, pinned npm dependencies, Python 3. On Windows/WSL run Node inside WSL, not directly against UNC.
- Required checks are in README; browser checks must name what was actually exercised. AST identity does not prove every animation frame is pixel-identical.
- Inspect branch/status/remotes before Git mutations. This checkout is the single-commit public snapshot at adawolfs/learn-arduino. The user authorized replacing its main history for this release. Future history replacement still requires explicit authorization. Never rewrite the private development repository history. No credentials, node_modules, .tools or build outputs in commits.
- The previous app is donor evidence in Git history at ec3fa8223147690873e60b84c70706e821684d8c. Do not silently restore its UI/session architecture.