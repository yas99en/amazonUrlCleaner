var cacheName = 'mycache';
var filesToCache = [
   './',
   './index.html',
   'css/style.css',
   'js/main.js'
];

self.addEventListener('install', function(e) {
    var promise = (async () => {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
    })();
    e.waitUntil(promise);
});

self.addEventListener('fetch', function(e) {
    var p = (async () => {
        var response = await caches.match(e.request)
        return response || fetch(e.request);
    })();
    e.respondWith(p);
});
