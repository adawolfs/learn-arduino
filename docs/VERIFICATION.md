# Verification — Arduino restart, 2026-10-31

## Automated evidence

- Exact capture: 77 files, SHA-256/size checked; all 77 served responses matched captured bytes and MIME types on port 5232.
- Capture safety: 4 Python tests (URL scope/path safety, compiled import discovery, HTML fallback handling).
- Source: differential sketch cases across all 16 lessons, defaults, options, numeric extrema and falsy/missing values; import closure; shared bootstrap boundaries; locale paths; model API mapping.
- Executable AST: every top-level original application binding except four explicit substitutions; all model and scene bindings except four floor-signature bindings. Dynamic import names are normalized only through the recorded module map. This guards untouched algorithms, including procedural geometry and transitions.
- Reproducibility: 93 generated outputs, 17 original modules, 91 extracted bindings.
- Root and `/learn-arduino-private/` production builds: 13 HTML pages each, 75 files each, 161 checked HTML/CSS/module/manifest references each.

## Browser evidence

Production root preview was tested using the browser UI against the live original. All 16 lessons were selected, allowed to reach their expected lesson heading after the transition, and compared for rendered document title, heading list and complete sketch text. All 16 matched after restoring the deliberately modified Blink timing. JSON comparison evidence is under `docs/evidence`.

Blink: clicked the physical LED, selected Blue, changed ON time 500→550 ms, confirmed code delay(550), ran sketch, observed serial HIGH/LOW changes and schematic live state; later restored Red/500 through the inline-code inspector. Values persisted across reload as in the original.

Servo: opened inspector from inline code, changed target 180→175 degrees, confirmed both loop bounds changed, ran sketch, observed changing angle/pulse labels and serial arm.write values; camera reset and inspector close remained functional.

Spanish direct entry under the repository prefix loaded models/fonts/UI; switching to English retained `/learn-arduino-private/#blink`. No console warnings/errors were recorded during the initial all-lesson navigation. See screenshots for selected states.

## Known limits and inherited behavior

- No original private source repository or source maps were available. Readable recovered internals still contain minified local identifiers.
- Browser coverage is navigation across all lessons plus representative detailed interactions, not exhaustive testing of every physical gesture, device/browser, audio waveform or animation frame. AST identity is stronger algorithm evidence, but does not establish pixel equality across GPU/browser implementations.
- Clicking the floating LED tag selected the breadboard in both original and reconstruction; clicking the physical LED opened the correct inspector. Preserved as original behavior, not silently repaired.
- Captured original scripts and images may contain original credits; active reconstruction intentionally omits presentation signatures while preserving reference provenance/notices.
- The Pages-style build is local verification only. No public deployment or visibility change is authorized by this work.
Final execution: 11 Node tests and 4 Python tests passed. Independent review found no actionable issues. Both builds were rebuilt after authored-source formatting. The original shader strings intentionally retain their whitespace; normal diff whitespace checks passed for other files, with shader-file checks allowing original trailing/indent whitespace. Private main received reconstruction checkpoint 8718f7b39a3b6df544dcb65c2de21d0bba6d242e via a non-force push and its remote SHA was confirmed.
