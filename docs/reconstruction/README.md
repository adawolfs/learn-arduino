# Source ownership and extension workflow

## What was recovered

The fresh 2026-10-31 deployment consists of five application/runtime chunks, twelve language chunks, thirteen HTML entry points and original local styling/fonts/images. `reference/manifest.json` contains 77 captured files (6,340,776 bytes). Source maps were probed for all 18 JS/CSS assets; none were available. Twelve missing `/assets/locales/<language>.js` candidates are Vite locale-map keys, not imports: the real hashed modules are captured. `/sw.js` was an optional probe and returned 404.

`recovery-map.json` records the mapping of every deployed JS chunk and the ownership of 91 extracted bindings. Recovery validates all manifest bytes first, parses modules, rewrites actual import/export expressions, closes binding dependencies, guards expected transformation counts, and emits reproducible source. It does not recover original TypeScript, comments, tests or project configuration that the site did not publish.

## Deliberate adaptations

1. Bootstrap is separated from localization; models and scene do not import the application bootstrap. Audio and signal bindings remain shared ES-module singletons.
2. Vite owns rebuilt preload dependencies. The old compiled preload lookup is disabled in the app chunk.
3. Three locale routing expressions use authored helpers so `/` and repository prefixes work without losing query/hash.
4. The active floor signature texture is transparent. Original mesh/fade/disposal ownership stays intact. Blank sidebar credit spans retain layout measurements. Author metadata is omitted from active pages. The capture remains exact and retains provenance.
5. Pure sketch parameter/template helpers are authored and compared against the original implementations across all 16 lessons and options/extrema.
6. A base-relative webmanifest replaces the original-domain deployment metadata. Original robots/sitemap remain archive evidence, not active deployment files.

## Donors

- BenchTwin preservation: bounded capture/server ideas and implementation, reviewed and adapted for this origin. No BenchTwin application code.
- ESP32: only pure sketch/template helpers in the active app. Its recovery process informed the approach; Arduino's current deployment determines runtime behavior.
- Prior Arduino at `ec3fa8223147690873e60b84c70706e821684d8c`: semantic API names for `src/models.js`, not geometry, UI, scene or session code. The current deployed kit does not export the old toy-car factory; it is intentionally not in the facade. `model-exports.json` links 52 names to current exported bindings.

## Extending without losing fidelity

1. Start from a small boundary and define the behavior with examples. Keep the unchanged archive as the oracle.
2. Add a regression/differential test for the values and edge cases that matter. Check state sharing and lifecycle, not only text output.
3. Put authored logic outside `src/recovered`. Update the AST recipe to replace the exact old binding and route its existing callers to the authored API. Guard the expected binding and transformation counts.
4. Run regeneration and `verify:source`; tests must prove every untouched original executable AST still matches.
5. For a new lesson/model, integrate the active lesson data and scene factory path deliberately. A facade export or preview alone does not register a component. Cover its physical terminals, wire metadata, picking/inspector, parameter-to-sketch mapping, shared simulation inputs and outputs, schematic and teardown. Animate local children; preserve scene-root transition ownership.
6. Reuse captured Three primitives/runtime. Never import a second npm Three instance into existing objects. Keep resources owned and disposed once.
7. Verify root and prefix builds, browser controls and lesson transitions before committing. Record precisely what was tested and what remains recovered.

Do not run the original capture script into an existing archive. For a future capture use a new destination, compare manifests and review source drift before changing the recovery recipe.