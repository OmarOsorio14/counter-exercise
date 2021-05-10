const CACHE_NAME = "v1_cache_contador";
const urlsToCache = [
    "./",
    "./img/mainIcon.png",
    "./img/logo32.png",
    "./img/logo64.png",
    "./img/logo128.png",
    "./img/logo256.png",
    "./img/logo512.png",
    "./img/logo1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e =>{
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) === -1 ){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.Clients.claim()
        )
    )
} )

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res)
                {
                    return res
                }
                return fetch(e.request)
            }
        )
    )
})