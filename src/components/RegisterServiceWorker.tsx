import { useEffect } from 'react'

export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => {
            console.log('Service Worker registered')
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      })
    }
  }, [])

  return null
}
