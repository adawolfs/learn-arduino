# Learn Arduino — preservation-first reconstruction

A fresh preservation of https://learn-arduino-red.vercel.app/ captured on 2026-10-31, followed by a source reconstruction that keeps its original procedural models, UI, transitions, interactions, simulation and 16 lessons. This public release has one root commit; full development history remains in the separate private development repository.

## Run locally

Use Node 24 and Python 3. From this checkout:

```sh
npm ci
npm run dev
```

Development: http://127.0.0.1:5230/. Production: `npm run build && npm run preview` at http://127.0.0.1:5231/.

The independent, exact preservation copy uses `npm run preserve:serve` at http://127.0.0.1:5232/. It requires only Python and serves captured files from the manifest. The server binds to loopback and restricts external runtime requests. Original content remains evidence, including its attribution.

## Structure

- `reference/site/`: immutable deployed bytes; `manifest.json` records hashes, URLs and MIME types.
- `scripts/reconstruct.mjs`: deterministic, guarded AST recovery recipe.
- `src/recovered/`: generated readable ES modules with named boundaries for lessons, inspector, schematic, code panel, sidebar, navigation, audio, signals, models and scene.
- `src/sketch/template.js`: authored pure sketch helpers, differential-tested against the original.
- `src/runtime/routes.js`: authored root/subpath language routing.
- `src/models.js`: 52 semantic exports over the freshly recovered models; no old donor geometry.
- `docs/reconstruction/`: ownership, adaptation and extension information.

The original private development source and source maps were not available. This is a reconstruction from publicly served deployment files, not a claim to possess the author's repository. Recovered internals still contain minified local names; incremental extraction is safer than rewriting them wholesale.

## Checks

```sh
npm run test:capture
npm test
npm run verify:source
python3 scripts/verify-reference.py
npm run build
npm run build:pages
node scripts/verify-build.mjs dist /
node scripts/verify-build.mjs dist-pages /learn-arduino/
```

`npm run reconstruct` regenerates owned outputs. Do not edit generated files directly. Read [source ownership and extension workflow](docs/reconstruction/README.md) and [verification](docs/VERIFICATION.md).

This repository is a single-commit public release snapshot. GitHub Actions validates and deploys dist-pages to https://adawolfs.github.io/learn-arduino/. The exact archive and reconstruction tooling remain in the repository but are not deployed as website content. Full development history is maintained separately in the private development repository. Keep third-party notices and original provenance.