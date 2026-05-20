// Service Worker — offline / airplane mode support
//
// Strategy:
//   Install caches only the page itself (tiny, always succeeds).
//   MP3s and other assets are cached opportunistically as they load over WiFi.
//   After a WiFi session where tracks played, those tracks are available offline.
//
// Bump CACHE_NAME to force all clients to re-cache on next WiFi visit.
const CACHE_NAME = 'lemonteapot-v1.1';

// Only these are pre-cached at install — small files, fast, atomic success guaranteed
const PRECACHE = ['/', '/index.html', '/manifest.json', '/robots.txt'];

// Install: cache the page shell immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches, take control of all open tabs instantly
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: serve from cache when available; cache every successful WiFi response
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // weather API calls bypass the SW

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request).then(response => {
        if (response.ok) {
          // Cache this resource for next time (MP3s build up here as tracks play)
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline and not cached — return the page for navigation requests
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
