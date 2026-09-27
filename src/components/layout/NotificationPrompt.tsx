import { useState, useEffect } from 'react'
import { Bell, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  isPushNotificationSupported,
  subscribeToPushNotifications,
  getNotificationPermission,
  checkPushSubscriptionStatus,
} from '@/lib/pushNotifications'

export function NotificationPrompt({ user }: { user?: { id: string } | null }) {
  const { t } = useTranslation()
  const [showPrompt, setShowPrompt] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    // Do not show if dismissed previously
    const hasDismissed = localStorage.getItem('notification_prompt_dismissed')
    if (hasDismissed === 'true') return

    // Check if browser supports push
    if (!isPushNotificationSupported()) return

    // If permission already granted or denied, don't show
    const perm = getNotificationPermission()
    if (perm === 'granted' || perm === 'denied') return

    // Verify subscription status
    checkPushSubscriptionStatus(user.id).then((isSubscribed) => {
      if (!isSubscribed) {
        // Show after a gentle 1.5s delay
        const timer = setTimeout(() => setShowPrompt(true), 1500)
        return () => clearTimeout(timer)
      }
    })
  }, [user?.id])

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('notification_prompt_dismissed', 'true')
  }

  const handleEnable = async () => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      const res = await subscribeToPushNotifications(user.id)
      if (res.success) {
        toast.success(t('notifications.subscribedSuccess', 'Notifications activées avec succès !'))
        setShowPrompt(false)
        localStorage.setItem('notification_prompt_dismissed', 'true')
      } else {
        toast.error(res.error || t('notifications.error', 'Une erreur est survenue.'))
        if (getNotificationPermission() === 'denied') {
          setShowPrompt(false)
        }
      }
    } catch (err: any) {
      toast.error(err.message || t('notifications.error', 'Une erreur est survenue.'))
    } finally {
      setIsLoading(false)
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-22 sm:bottom-24 left-4 right-4 z-40 max-w-md mx-auto flex flex-col gap-3 rounded-2xl border border-[#e9c349]/30 bg-[#021f0d]/95 p-5 text-[#c9ebd0] shadow-2xl backdrop-blur-xl">
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-3 p-1 text-[#c8c5d0]/50 hover:text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349] border border-[#e9c349]/20">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-serif text-base font-bold text-[#e9c349]">
            {t('notifications.promptTitle', 'Activer les rappels du soir ?')}
          </h4>
          <p className="text-xs text-[#c8c5d0]/80 leading-relaxed mt-1">
            {t(
              'notifications.promptDesc',
              'Recevez une douce invitation chaque soir pour consigner vos pensées et être notifié de votre synthèse du dimanche.',
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button
          onClick={handleEnable}
          disabled={isLoading}
          className="flex-1 rounded-full bg-[#e9c349] h-10 text-xs font-bold text-[#001809] hover:bg-[#e9c349]/90 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Bell className="h-3.5 w-3.5" />
              {t('notifications.promptEnable', 'Activer les notifications')}
            </>
          )}
        </Button>

        <Button
          onClick={handleDismiss}
          variant="ghost"
          className="rounded-full h-10 text-xs text-[#c8c5d0]/70 hover:text-white hover:bg-white/5 px-4"
        >
          {t('notifications.promptLater', 'Plus tard')}
        </Button>
      </div>
    </div>
  )
}
