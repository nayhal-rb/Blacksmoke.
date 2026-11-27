# BLACKSMOKE

Street racing in Solano Bay. Plays in the browser (WebGPU, WebGL 2 fallback), and installs as an app.

## Install it as an app (iPad / iPhone)

1. Open the game's GitHub Pages address in Safari or Chrome.
2. Safari: Share → **Add to Home Screen**, keep **Open as Web App** on. Chrome: the menu → **Add to Home Screen**.
3. Start it from the new BLACKSMOKE icon: it opens full screen, without the browser bars.

After the first run the game, cars, textures and sounds are kept on the device, so the app also starts offline.
A new build is picked up automatically the next time it starts online.

## Files

- `index.html` — the whole game (code and car bodies inside the page)
- `models/hero/` — full-detail car models, `tex/` — surface textures, `snd/` — engine and traffic sound loops
- `manifest.json`, `sw.js`, `icon-*.png` — the installable app (offline copy, home-screen icon)
- `version.json` — the current build; an older copy of the page reloads itself when this changes
