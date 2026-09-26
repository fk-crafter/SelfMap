import { useState, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const currentLang = (i18n.language || 'en').startsWith('fr') ? 'fr' : 'en'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageSwitch = (lang: 'en' | 'fr') => {
    void i18n.changeLanguage(lang)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', lang)
      const path = window.location.pathname
      if (lang === 'fr' && (path === '/' || path === '/en')) {
        navigate({ to: '/fr' })
      } else if (lang === 'en' && path === '/fr') {
        navigate({ to: '/en' })
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(0, 24, 9, 0.95)'
            : 'rgba(0, 24, 9, 0.6)',
          borderRadius: isScrolled ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 30,
          mass: 0.5,
        }}
        className={`pointer-events-auto flex items-center justify-between backdrop-blur-xl ${
          isScrolled
            ? 'mt-4 h-16 w-[calc(100%-2rem)] max-w-5xl border border-white/10 px-3 sm:px-6 shadow-2xl'
            : 'mt-0 h-20 w-full max-w-none border-b border-white/5 px-4 md:px-12'
        }`}
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="SoulType"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="whitespace-nowrap font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#e9c349]">
            SoulType
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-0.5 text-xs backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleLanguageSwitch('en')}
              className={`cursor-pointer rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold transition-all ${
                currentLang === 'en'
                  ? 'bg-[#e9c349] text-[#001809] shadow-sm'
                  : 'text-[#c8c5d0]/50 hover:text-[#c9ebd0]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageSwitch('fr')}
              className={`cursor-pointer rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold transition-all ${
                currentLang === 'fr'
                  ? 'bg-[#e9c349] text-[#001809] shadow-sm'
                  : 'text-[#c8c5d0]/50 hover:text-[#c9ebd0]'
              }`}
            >
              FR
            </button>
          </div>

          <Link
            to="/login"
            className="whitespace-nowrap text-xs sm:text-sm font-medium text-[#c8c5d0] transition-colors hover:text-[#e9c349]"
          >
            {t('nav.login')}
          </Link>
          <Button
            asChild
            className="h-8 sm:h-10 whitespace-nowrap rounded-full bg-[#e9c349] px-3 sm:px-6 text-xs sm:text-sm font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-all hover:bg-[#e9c349]/90 active:scale-95"
          >
            <Link to="/test" preload="render">
              {t('nav.startJourney')}
            </Link>
          </Button>
        </div>
      </motion.nav>
    </div>
  )
}
