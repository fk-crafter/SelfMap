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

self.addEventListener('push', (event) => {
  let data = {
    title: 'Le Sanctuaire 🌿',
    body: 'Votre Soul Coach vous attend pour votre rituel quotidien.',
    url: '/journal',
    icon: '/logo.png',
    badge: '/favicon.ico',
  }

  if (event.data) {
    try {
      const payload = event.data.json()
      data = { ...data, ...payload }
    } catch (e) {
      data.body = event.data.text()
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/logo.png',
    badge: data.badge || '/favicon.ico',
    data: {
      url: data.url || '/dashboard',
    },
    vibrate: [100, 50, 100],
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = event.notification.data?.url || '/dashboard'

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url && 'focus' in client) {
            client.navigate(targetUrl)
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl)
        }
      }),
  )
})

