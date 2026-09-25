# bbobkr / website

Personal site, v0.1 test build. Concept: **The Open Workbench**, where paper, ink and one signal colour frame working artifacts instead of decorative claims.

## Run

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the build
```

## Structure

- `src/components/` — one file per section, plus `Icons.jsx` (inline SVG) and `ProcessArtifacts.jsx`
- `src/lib/gsap.js` — registers ScrollTrigger once; animations use `gsap.matchMedia(scope)` so they are skipped under `prefers-reduced-motion` and reverted on unmount
- `src/styles.css` — design tokens on `:root`, then sections in page order
- `src/content.js` — handle, links and section list

## Design tokens

| Role | Token | Hex |
| --- | --- | --- |
| Background | `--paper` | `#F3F0E8` |
| Surface | `--surface` | `#FBF9F4` |
| Text / ink | `--ink` | `#17160F` |
| Primary | `--signal` | `#E4491C` |
| Primary text on light | `--signal-deep` | `#B3380F` |
| Secondary | `--blueprint` | `#1E3A5C` |
| Accent | `--ochre` | `#D9A21B` |
| Secondary text | `--muted` | `#5E5A50` |
| Border | `--border` | `#D9D3C5` |
| Success | `--pass` | `#2F7D4F` |

Type: Bricolage Grotesque (display), Newsreader italic (editorial), Figtree (body), JetBrains Mono (technical).

The brief composer has no backend: it formats a brief for the visitor to copy.
