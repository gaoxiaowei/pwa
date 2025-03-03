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
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         fetchAndCache(event.request)
//     );
// });
self.addEventListener('fetch', event => {
    event.respondWith(
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Response('Gateway Timeout', { status: 504, statusText: 'Gateway Timeout' }));
            }, 2000); // 设置 2 秒超时模拟 504 错误
        })
    );
});

function fetchAndCache(request) {
    return fetch(request).then((response) => {
        return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch failed');
            }
            return response;
        })
        .catch(() => caches.match(request));
        return response;
    });
}