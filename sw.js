// Service Worker — caches all assets for offline / airplane mode use.
// Bump CACHE_NAME when deploying updated MP3s or HTML.
const CACHE_NAME = 'lemonteapot-v1.0';

const ASSETS = [
  '/',
  '/index.html',
  '/robots.txt',
  '/music/cloud-veil-1.mp3',
  '/music/cloud-veil-2.mp3',
  '/music/rain-on-glass-1.mp3',
  '/music/rain-on-glass-2.mp3',
  '/music/soft-pedal-drift-1.mp3',
  '/music/soft-pedal-drift-2.mp3',
  '/music/rain.mp3',
];

// Install: pre-cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for everything we pre-cached, network-first otherwise
self.addEventListener('fetch', e => {
  // Only handle same-origin and GET requests
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // let external API calls (weather) go through

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
