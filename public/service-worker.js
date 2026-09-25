const CACHE_NAME = 'selfmap-cache-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  // Let network handle API requests directly without SW interference
  if (url.pathname.startsWith('/api') || event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  )
})
