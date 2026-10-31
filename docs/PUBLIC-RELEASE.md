# Public release — 2026-10-31

This is an independent single-root-commit snapshot of the verified Arduino preservation-first reconstruction. It does not include private Git history. Runtime source, exact reference capture and recovery checks are retained.

Public deployment adaptations: Vite base /learn-arduino/, Node 24 pin, root and Pages verification, and a GitHub Actions Pages workflow that runs checks before deploying only dist-pages. The original site archive is repository evidence, not public website output.

The previously published public main was backed up locally before replacement. History replacement uses an explicit expected-old-SHA force-with-lease, not an unrestricted force push. The private repository and existing development checkouts remain unchanged.
