const CACHE_NAME = 'cl-familier-v1';
const assets = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cachedRes => cachedRes || fetch(e.request)));
});
