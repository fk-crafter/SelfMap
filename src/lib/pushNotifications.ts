function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function isPushNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'default'
  }
  return Notification.permission
}

export async function getVapidPublicKey(): Promise<string> {
  try {
    const res = await window.fetch('/api/notifications/public-key')
    if (res.ok) {
      const data = await res.json()
      if (data.publicKey) return data.publicKey
    }
  } catch (err) {
    console.error('Failed to fetch public key from server:', err)
  }

  return (
    (import.meta.env.VITE_VAPID_PUBLIC_KEY as string) ||
    'BCGVeRz4PdhxiI0AeQmaQknG1fEtJvCB6s1SzDaf6fGOxMyB-vKoFisS8czyFYijK8i7Y9GbQnFhPRokON3Tnes'
  )
}

export async function subscribeToPushNotifications(
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isPushNotificationSupported()) {
    return {
      success: false,
      error: 'Les notifications push ne sont pas supportées par votre navigateur.',
    }
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      return {
        success: false,
        error: 'Permission de notification refusée.',
      }
    }

    const registration = await navigator.serviceWorker.ready
    const publicKey = await getVapidPublicKey()
    const convertedVapidKey = urlBase64ToUint8Array(publicKey)

    let subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey as unknown as BufferSource,
      })
    }

    const subJson = subscription.toJSON()

    const res = await window.fetch('/api/notifications/subscribe', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({
        endpoint: subJson.endpoint,
        keys: {
          p256dh: subJson.keys?.p256dh,
          auth: subJson.keys?.auth,
        },
      }),
    })

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`)
    }

    return { success: true }
  } catch (err: any) {
    console.error('Error subscribing to push:', err)
    return {
      success: false,
      error: err.message || "Erreur lors de l'activation des notifications.",
    }
  }
}

export async function unsubscribeFromPushNotifications(
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isPushNotificationSupported()) {
    return { success: false }
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      const endpoint = subscription.endpoint
      await subscription.unsubscribe()

      await window.fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ endpoint }),
      })
    }

    return { success: true }
  } catch (err: any) {
    console.error('Error unsubscribing:', err)
    return { success: false, error: err.message }
  }
}

export async function checkPushSubscriptionStatus(
  userId: string,
): Promise<boolean> {
  if (!isPushNotificationSupported()) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    if (!subscription) return false

    const res = await window.fetch('/api/notifications/status', {
      credentials: 'include',
      headers: { 'x-user-id': userId },
    })

    if (res.ok) {
      const data = await res.json()
      return Boolean(data.subscribed)
    }

    return false
  } catch {
    return false
  }
}

export async function triggerTestPush(
  userId: string,
  lang: string = 'fr',
): Promise<boolean> {
  try {
    const res = await window.fetch('/api/notifications/test', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-user-id': userId,
        'x-user-lang': lang,
      },
    })
    return res.ok
  } catch {
    return false
  }
}
