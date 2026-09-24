import { useState, useEffect } from 'react'
import { X, Share, PlusSquare } from 'lucide-react'

export function PwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && (navigator as any).standalone)

    if (isStandalone) return

    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)

    if (isIosDevice) {
      const hasSeenPrompt = localStorage.getItem('pwa_prompt_seen')
      if (!hasSeenPrompt) {
        setShowPrompt(true)
      }
    }
  }, [])

  const dismissPrompt = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa_prompt_seen', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 flex flex-col gap-2 rounded-2xl border border-[#e9c349]/30 bg-[#032110] p-4 text-[#c9ebd0] shadow-2xl backdrop-blur-xl">
      <button
        onClick={dismissPrompt}
        className="absolute right-2 top-2 p-1 text-white/50 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-3 pr-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/20">
          <PlusSquare className="h-5 w-5 text-[#e9c349]" />
        </div>
        <p className="text-sm">
          Installe l'app : touche <Share className="mx-1 mb-1 inline h-4 w-4" />{' '}
          puis <strong>« Sur l'écran d'accueil »</strong>
        </p>
      </div>
    </div>
  )
}
