/* حرفي - خدمة العمل بدون إنترنت */
const VERSION = 'harfi-v1';
const PRECACHE = `${VERSION}-precache`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE_URLS = [
  '/index.html',
  '/arabic.html',
  '/english.html',
  '/countries.html',
  '/country.html',
  '/stories.html',
  '/play.html',
  '/math.html',
  '/coloring.html',
  '/parent-report.html',
  '/pro.html',
  '/css/style.css',
  '/js/layout.js',
  '/js/speech.js',
  '/js/app.js',
  '/js/math.js',
  '/js/play.js',
  '/js/rewards.js',
  '/js/stories.js',
  '/js/songs.js',
  '/js/tashkeel.js',
  '/js/countries.js',
  '/js/country-extra.js',
  '/js/country-regions.js',
  '/js/anthems.js',
  '/js/coloring-shapes.js',
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(c => Promise.allSettled(PRECACHE_URLS.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.allSettled(
      names.filter(n => n.startsWith('harfi-') && !n.startsWith(VERSION)).map(n => caches.delete(n))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.startsWith('/~oauth') || url.pathname.startsWith('/api/')) return;

  // الصفحات: الشبكة أولاً ثم الكاش
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(RUNTIME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req)) || (await caches.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // الأصول (ملفات، خطوط، صور، أعلام): الكاش أولاً
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && (fresh.ok || fresh.type === 'opaque')) {
        const cache = await caches.open(RUNTIME);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch {
      return cached || Response.error();
    }
  })());
});
