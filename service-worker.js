const CACHE_NAME = 'pwa-cache-v1';
const CACHE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './manifest.json'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching assets');
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(fetchAndCache(event.request);
    );
});

function fetchAndCache(request) {
    return fetch(request).then((response) => {
        var response = new Response('Gateway Timeout', { status: 504, statusText: 'Gateway Timeout' })
        return response;
    });
}