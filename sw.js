const staticCacheName = 'site-statics-v2';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/css/style.css',
    '/img/sprite.png',
    '/audio/audio_sfx_die.wav',
    '/audio/audio_sfx_flap.wav',
    '/audio/audio_sfx_hit.wav',
    '/audio/audio_sfx_point.wav',
    '/audio/audio_sfx_swooshing.wav'
];

// install service workers
self.addEventListener('install', evt =>{
    //console.log('service worker instal done')
    evt.waitUntil(
        caches.open(staticCacheName).then(Cache =>{
        //console.log('cache shell assets');
        Cache.addAll(assets);
    }))
    
    
});

// activate service worker
self.addEventListener('activate',evt =>{
   // console.log('service worker activate done')
   evt.waitUntil
   (
        caches.keys().then(keys => {
        //  console.log(key5);
            return Promise.all(keys 
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});
// fetch event
self.addEventListener('fetch',evt =>{
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cachRes =>{
            return cachRes || fetch(evt.request);
        })
    )
});
