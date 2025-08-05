'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "bbae8961ed47f510fcd7a7eb5e23bf55",
"version.json": "bfeefe902f2621455c5dc31004ca3562",
"index.html": "ca61adf20aedfc2dea075e354b27d2a2",
"/": "ca61adf20aedfc2dea075e354b27d2a2",
"loader.css": "3ed0540af717cd56f01a37a08f714759",
"main.dart.js": "23386b4057bd7453e107752e08b902c2",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "5089233adca121ba5067b2259fea17cf",
"assets/AssetManifest.json": "6cd6f6c63c8e26baa92ce87f0158f96a",
"assets/NOTICES": "99830dff15edd1ff95f23b5cbe3ba2b9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "0c97c632598459b06d949886eeb495aa",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "5f72d664707e4d711a1c0c240912cd50",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c4625591fbb400a49c1b3103a91b3f48",
"assets/fonts/MaterialIcons-Regular.otf": "e7f61b027327d318775dbdaecb3d1366",
"assets/assets/brand3.png": "c0915a84744f3481a2105c5aea6727e0",
"assets/assets/email.png": "5eb3c4b86aafbee72b8c471b29413a50",
"assets/assets/mappin.png": "9cc090022ae31337336d2024160714b8",
"assets/assets/design.png": "6aaec412d8837ac9a83f03f453877606",
"assets/assets/person_small.png": "6f780d058150543096d7bd3060db4ac4",
"assets/assets/brand2.png": "91c6d8820e35e10e39757e0de6ac4345",
"assets/assets/brand1.png": "f3a3a0de79048e1f14aac62ec76609b8",
"assets/assets/brand5.png": "fc57e9a9ff95830ea207e2452ffd4bd6",
"assets/assets/logo%25202.png": "3e2cae39a5e0885d8cd759205d921bc5",
"assets/assets/brand4.png": "e9441e9a5d26e508f592aa31b9febff6",
"assets/assets/male.png": "a687ddbf4597360c3b9e293a58b1d829",
"assets/assets/person.png": "5b6ba176416812aa5448c6704d31caa0",
"assets/assets/promote.png": "2bd8adcad79a4ebb80888d1a0583b3c4",
"assets/assets/female.png": "29c52b49d99a5de88d34ab04aafe3f59",
"assets/assets/quote.png": "1a0aa9a06293ac5689bc32012e0e13e6",
"assets/assets/logo.png": "a00e91d16fc6745f6ec98eab7186457b",
"assets/assets/develop.png": "471c2c94d5d04112086eba9fd78c6809",
"assets/assets/laptop.png": "fb49e3c0c36437239db5f8c114b03062",
"assets/assets/phone.png": "45903a1ffa9ede882171aca9f71c4c29",
"assets/assets/ios.png": "49f79e21da11e96b8cf0e3b8bef6616c",
"assets/assets/write.png": "dc4f0d3df06d5fc9b13b9168b88e2560",
"assets/assets/whatsapp.png": "426617ad28567da23a2346566d84b5a6",
"assets/assets/2.png": "cc97e0e3cea82e4a11b88c6163bca0fe",
"assets/assets/3.png": "3f9e95747a4dbfe2ed77b66faa8b12a9",
"assets/assets/1.png": "11ca24a708a383136caf51e7ee2b4326",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
