import { useState, useEffect } from 'react'
import { X, Share, PlusSquare, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PwaPrompt() {
  const { t } = useTranslation()
  const [showPrompt, setShowPrompt] = useState(false)
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && (navigator as any).standalone)

    if (isStandalone) return

    const hasSeenPrompt = localStorage.getItem('pwa_prompt_seen')
    if (hasSeenPrompt) return

    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)

    if (isIosDevice) {
      setPlatform('ios')
      setShowPrompt(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setPlatform('android')
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const dismissPrompt = () => {
    setShowPrompt(false)
    try {
      localStorage.setItem('pwa_prompt_seen', 'true')
    } catch {}
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult?.outcome === 'accepted') {
        setShowPrompt(false)
        try {
          localStorage.setItem('pwa_prompt_seen', 'true')
        } catch {}
      }
    } catch (err) {
      console.error('Install prompt error:', err)
    } finally {
      setDeferredPrompt(null)
    }
  }

  if (!showPrompt || !platform) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 flex flex-col gap-2 rounded-2xl border border-[#e9c349]/30 bg-[#032110] p-4 text-[#c9ebd0] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={dismissPrompt}
        aria-label="Fermer"
        className="absolute right-2 top-2 p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>

      {platform === 'ios' ? (
        <div className="flex items-center gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/20">
            <PlusSquare className="h-5 w-5 text-[#e9c349]" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-[#e9c349]">
              {t('pwa.iosTitle', "Installez l'application")}
            </p>
            <p className="text-xs text-[#c8c5d0]/80 mt-0.5 leading-relaxed">
              {t('pwa.iosInstruction', 'Touchez')}{' '}
              <Share className="mx-1 inline h-3.5 w-3.5 text-[#e9c349]" />{' '}
              {t('pwa.iosInstruction2', 'puis')}{' '}
              <strong className="text-[#c9ebd0]">
                {t('pwa.iosAction', "« Sur l'écran d'accueil »")}
              </strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 pr-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/20">
              <Download className="h-5 w-5 text-[#e9c349]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#e9c349] truncate">
                {t('pwa.androidTitle', 'Installez SoulType')}
              </p>
              <p className="text-xs text-[#c8c5d0]/80 line-clamp-1">
                {t('pwa.androidDesc', "Accédez à votre sanctuaire depuis l'écran d'accueil.")}
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#e9c349] text-xs font-bold text-[#001809] hover:bg-[#e9c349]/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(233,195,73,0.2)] cursor-pointer"
          >
            {t('pwa.installBtn', 'Installer')}
          </button>
        </div>
      )}
    </div>
  )
}
