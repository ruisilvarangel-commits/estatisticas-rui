/* -----------------------------------------
   ESTATÍSTICAS RUI - SERVICE WORKER
   Cache para funcionamento offline (PWA)
------------------------------------------ */

const CACHE_NAME = "rui-stats-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "data_casa_fora.json",
  "data_sub16.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
