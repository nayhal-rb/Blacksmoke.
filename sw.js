// BLACKSMOKE offline app: keeps the game, car models, textures and sounds on the device after the first visit, so the
// home-screen app starts without the network. One cache per build: a new build installs a new worker (this file
// changes with the build name), which fetches fresh files and deletes the old cache.
const BUILD = 'b40', CACHE = 'blacksmoke-' + BUILD;
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png']).catch(() => {}))); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('blacksmoke-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.endsWith('/version.json')) return;   // always from the network: the page uses it to spot a newer build
  const page = e.request.mode === 'navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/');
  if (page) {   // the page: network first (newest build when online), the saved copy when offline
    e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((ca) => ca.put(e.request, c)); } return r; }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))));
    return;
  }
  // models, textures, sounds: from this build's cache, fetched once
  e.respondWith(caches.open(CACHE).then((ca) => ca.match(e.request).then((hit) => hit || fetch(e.request).then((r) => { if (r.ok && r.status === 200) ca.put(e.request, r.clone()); return r; }))));
});
