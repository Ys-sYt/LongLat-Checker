const CACHE_NAME = 'latlng-map-cache-v1';
// キャッシュするファイルのリスト
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icons/icon-128.png',
  'icons/icon-512.png',
  'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css',
  'https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.js'
];

// インストール時にキャッシュを作成する
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetchイベントでリクエストを横取りし、キャッシュがあればそれを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュ内に一致するレスポンスがあれば、それを返す
        if (response) {
          return response;
        }
        //なければ、ネットワークから取得する
        return fetch(event.request);
      }
    )
  );
});