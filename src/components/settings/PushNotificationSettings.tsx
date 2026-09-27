import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, BellOff, BellRing, Check, Loader2, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  isPushNotificationSupported,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  checkPushSubscriptionStatus,
  triggerTestPush,
  getNotificationPermission,
} from '@/lib/pushNotifications'

export function PushNotificationSettings({ userId }: { userId: string }) {
  const { t, i18n } = useTranslation()
  const [isSupported, setIsSupported] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    const supported = isPushNotificationSupported()
    setIsSupported(supported)

    if (supported && userId) {
      checkPushSubscriptionStatus(userId).then((status) => {
        setIsSubscribed(status)
      })
    }
  }, [userId])

  const handleToggle = async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      if (isSubscribed) {
        const res = await unsubscribeFromPushNotifications(userId)
        if (res.success) {
          setIsSubscribed(false)
          toast.success(t('notifications.unsubscribedSuccess', 'Notifications désactivées.'))
        } else {
          toast.error(res.error || t('notifications.error', 'Une erreur est survenue.'))
        }
      } else {
        const res = await subscribeToPushNotifications(userId)
        if (res.success) {
          setIsSubscribed(true)
          toast.success(t('notifications.subscribedSuccess', 'Notifications activées avec succès !'))
        } else {
          toast.error(res.error || t('notifications.error', 'Une erreur est survenue.'))
        }
      }
    } catch (err: any) {
      toast.error(err.message || t('notifications.error', 'Une erreur est survenue.'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendTest = async () => {
    if (!userId) return
    setIsTesting(true)
    try {
      const ok = await triggerTestPush(userId, i18n.language)
      if (ok) {
        toast.success(t('notifications.testSent', 'Notification test envoyée sur votre appareil !'))
      } else {
        toast.error(t('notifications.testFailed', "Échec de l'envoi du test."))
      }
    } catch {
      toast.error(t('notifications.testFailed', "Échec de l'envoi du test."))
    } finally {
      setIsTesting(false)
    }
  }

  const permission = getNotificationPermission()

  return (
    <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e9c349]/20 bg-[#e9c349]/10 text-[#e9c349]">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl text-[#c9ebd0]">
              {t('notifications.title', 'Rappels & Notifications')}
            </h2>
            <span className="text-[10px] uppercase tracking-wider text-[#c8c5d0]/60">
              Web Push PWA
            </span>
          </div>
        </div>

        {isSubscribed && (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('notifications.active', 'Activé')}
          </span>
        )}
      </div>

      <p className="text-xs text-[#c8c5d0]/80 leading-relaxed mb-5">
        {t(
          'notifications.description',
          'Recevez un rappel bienveillant chaque soir pour déposer vos pensées dans le journal et être notifié dès la parution de votre bilan du dimanche.',
        )}
      </p>

      {!isSupported ? (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-300">
          {t(
            'notifications.notSupported',
            'Les notifications push ne sont pas supportées sur ce navigateur ou nécessitent d’installer l’application (PWA).',
          )}
        </div>
      ) : permission === 'denied' ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-300">
          {t(
            'notifications.permissionDenied',
            'Les notifications sont bloquées dans les paramètres de votre navigateur. Veuillez les autoriser pour activer les rappels.',
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <Button
            onClick={handleToggle}
            disabled={isLoading}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-full font-bold text-sm tracking-wider transition-all active:scale-[0.98] ${
              isSubscribed
                ? 'border border-white/10 bg-white/5 text-[#c8c5d0] hover:bg-white/10 hover:text-white'
                : 'bg-[#e9c349] text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] hover:bg-[#e9c349]/90'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSubscribed ? (
              <>
                <BellOff className="h-4 w-4" />
                {t('notifications.disable', 'Désactiver les rappels')}
              </>
            ) : (
              <>
                <BellRing className="h-4 w-4" />
                {t('notifications.enable', 'Activer les rappels push')}
              </>
            )}
          </Button>

          {isSubscribed && (
            <Button
              onClick={handleSendTest}
              disabled={isTesting}
              variant="ghost"
              className="w-full text-xs text-[#e9c349] hover:bg-[#e9c349]/10 rounded-full h-10 flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {t('notifications.sendTest', 'Envoyer une notification test')}
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
