// Service Worker v2 — maximally simple, zero install-time failures
//
// No caching during install (nothing can go wrong).
// Everything caches through the fetch handler as pages and tracks load on WiFi.
// After one WiFi session the page + played tracks are all available offline.
const CACHE = 'lemonteapot-v2';

// Install: activate immediately, no blocking work
self.addEventListener('install', () => self.skipWaiting());

// Activate: clean up old caches, take control of all tabs now
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin resources; silently cache every successful response
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // let weather/font requests through

  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request);
      if (cached) return cached;

      try {
        const response = await fetch(e.request);
        if (response.ok) cache.put(e.request, response.clone());
        return response;
      } catch {
        // Offline and not cached — serve the page shell for navigation requests
        if (e.request.mode === 'navigate') {
          return cache.match('/') || cache.match('/index.html');
        }
      }
    })
  );
});
