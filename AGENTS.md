# Repository Guide

## Project Shape

- This is a static GitHub Pages site with no package manifest, build step, or automated test suite. The runtime entrypoint is `index.html`; all behavior and styling live in `assets/js/main.js` and `assets/css/styles.css`.
- Production is hosted at `https://manuamest.github.io/Portfolio/`. Keep asset URLs relative (`assets/...`), not root-relative (`/assets/...`), or deployment under the `/Portfolio/` subpath will break.
- Treat executable files as authoritative. `README.md` is currently stale: fonts and icons are self-hosted, and the background is CSS-only rather than Google Fonts plus particles.js.

## Local Commands

```bash
# Serve from the repository root; prefer HTTP over file:// for media/preload checks.
python3 -m http.server 4173 --bind 127.0.0.1

# Focused verification (html-validate is downloaded by npx; it is not a repo dependency).
node --check assets/js/main.js
npx --yes html-validate index.html
git diff --check

# Optional performance regression check while the local server is running.
npx --yes lighthouse http://127.0.0.1:4173/ --quiet \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=/tmp/portfolio-lighthouse.json
```

## Non-Obvious Constraints

- Dark mode is the fixed default: `body.dark-theme`, the initial theme button `aria-pressed` values, and the JS fallback `getSavedTheme() || 'dark'` must stay aligned. User choice persists under `localStorage['portfolio-theme']`.
- `styles.css` contains a deliberately minimal Font Awesome mapping backed by `assets/webfonts/`. Adding an `fa-*` class without adding its codepoint mapping there produces a blank icon; keep `bars` and `times` because the mobile menu creates them dynamically.
- Do not replace `assets/img/echolook-demo.mp4` with an animated GIF/WebP or autoplay it. The poster plus click-to-play MP4 and `preload="none"` avoid severe main-thread blocking measured in Lighthouse.
- Do not reintroduce particles.js. The visual particle/grid background is intentionally CSS-only after the library caused repeated long tasks under CPU throttling.
- The experience counter start date is hard-coded as July 1, 2024 in `calculateExperience()`; keep the visible HTML fallback valid because crawlers may not run JavaScript.
- Professional-impact cases are intentionally anonymized. Keep the validation improvement approximate (`~8h`, `~1h`, `~87%`) and do not add proprietary architecture details without explicit approval.
- There is no CV file in the repository. Do not add a Download CV link until a real asset or verified external URL is available.

## Visual Verification

- Check at least 1440px desktop and 390px mobile, in both themes. The mobile breakpoint is 960px.
- Verify keyboard focus, Escape-to-close for the mobile menu, theme `aria-pressed` state, reduced-motion behavior, the EchoLook poster/video, and all external project links.
