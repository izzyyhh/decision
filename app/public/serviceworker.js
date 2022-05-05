const CACHE_VERSION = 1;
const CACHE_NAME = `decision_cache-${CACHE_VERSION}`;
const toCache = ["index.ejs"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(toCache);
        }),
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((cachesNames) =>
            Promise.all(
                cachesNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                }),
            ),
        ),
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(() => {
            return fetch(e.request).catch(() => {
                return caches.match("index.ejs");
            });
        }),
    );
});
