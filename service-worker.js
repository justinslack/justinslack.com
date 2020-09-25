'use strict';
const version = '{{site.time}}';
const staticCacheName = version + 'staticfiles';
const pagesCacheName = 'pages';
const imagesCacheName = 'images';

const cacheList = [
  staticCacheName,
  pagesCacheName,
  imagesCacheName
];

const offlinePages = [
  '/',
  '/about/',
  '/work/',
  '/articles/',
  '/show/'
];

function updateStaticCache() {
  return caches.open(staticCacheName)
  .then( cache => {
    cache.addAll([
      '/static/fonts/SchnyderM-Demi-Web.woff2',
      '/_includes/assets/css/main.css'
    ].concat(offlinePages));
    return cache.addAll([
      '/',
      '/about/',
      '/work/',
      '/articles/',
      '/show/',
      '/offline/'
    ]);
  });
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName)
  .then( cache => cache.put(request, response) );
}

function trimCache(cacheName, maxItems) {
  caches.open(cacheName)
  .then( cache => {
    cache.keys()
    .then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0])
        .then(trimCache(cacheName, maxItems));
      }
    });
  });
}

function clearOldCaches() {
  return caches.keys()
  .then( keys => {
    return Promise.all(keys
      .filter(key => !cacheList.includes(key))
      .map(key => caches.delete(key))
      );
  });
}

self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache()
    .then( () => self.skipWaiting() )
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches()
    .then( () => self.clients.claim() )
    );
});

self.addEventListener('message', event => {
  if (event.data.command == 'trimCaches') {
    trimCache(pagesCacheName, 35);
    trimCache(imagesCacheName, 20);
  }
});

self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }


  if (request.headers.get('Accept').includes('text/html')) {

    event.respondWith(
      fetch(request)
        .then( response => {
          let copy = response.clone();
          if (offlinePages.includes(url.pathname) || offlinePages.includes(url.pathname + '/')) {
            stashInCache(staticCacheName, request, copy);
          } else {
            stashInCache(pagesCacheName, request, copy);
          }
          return response;
        })
        .catch( () => {

          return caches.match(request)
          .then( response => response || caches.match('/offline/') );
        })
      );
    return;
  }

  event.respondWith(
    caches.match(request)
    .then(response => {
      return response || fetch(request)
      .then( response => {
        if (request.headers.get('Accept').includes('image')) {
          let copy = response.clone();
          stashInCache(imagesCacheName, request, copy);
        }
        return response;
      })
      .catch( () => {
        if (request.headers.get('Accept').includes('image')) {
          return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
        }
      });
    })
  );

});