
console.log("SW WORKER")

var CACHE_NAME = 'notification-experiment';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      console.log("swUrl: ",swUrl)
      install()
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    }).catch(function(err) {
      console.log(err)
    });
  });
}

function install() {
  console.log('[ServiceWorker] Install');
  window.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        console.log("Caching app shell: ",cache)
        // return cache.addAll(filesToCache);
      })
    );
  });
}
