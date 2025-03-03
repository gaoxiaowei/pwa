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

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 reject(new Response('Gateway Timeout', { status: 504, statusText: 'Gateway Timeout' }));
//             }, 2000); // 设置 2 秒超时模拟 504 错误
//         })
//     );
// });

self.addEventListener('fetch', event => {
    event.respondWith(
        new Promise((resolve, reject) => {
            // 模拟网络延迟，导致超时
            setTimeout(() => {
                // const response = new Response('Gateway Timeout', {
                //     status: 504,
                //     statusText: 'Response not Ok (fetchAndCacheOnce): request for https://gaoxiaowei.github.io/pwa/index.html returned response 504 Gateway Timeout'
                // });
                  const response = new Response(JSON.stringify({
                        error: 'Gateway Timeout',
                        message: 'Response not Ok (fetchAndCacheOnce): request for ' + event.request.url + ' returned response 504 Gateway Timeout'
                  }), {
                        status: 504,
                        statusText: 'Gateway Timeout', // 这部分通常不会被 NSError 直接打印
                        headers: { 'Content-Type': 'application/json' });
        })
                resolve(response);  // 返回自定义的 504 响应
            }, 1000);  // 设置延时，1秒后返回响应模拟超时
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