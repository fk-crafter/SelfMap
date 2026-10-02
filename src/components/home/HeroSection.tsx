import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Fingerprint, ArrowRight } from 'lucide-react'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Particles } from '@/components/ui/particles'
import { useTranslation } from 'react-i18next'

export function HeroSection({
  usersHelped: _usersHelped,
}: { usersHelped?: number } = {}) {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 sm:gap-7 lg:gap-8 pt-4 pb-16 text-center sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-20 h-full w-full">
        <Particles
          className="absolute inset-0 z-0 h-full w-full"
          quantity={120}
          ease={80}
          color="#c5c0fe"
          staticity={40}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto hidden w-full lg:block">
        <motion.img
          src="/analyste.png"
          alt="Avatar Analyste"
          className="absolute top-2 xl:top-6 -left-2 xl:left-4 w-20 lg:w-24 xl:w-30 opacity-65 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          initial={{ rotate: -8 }}
          animate={{ y: [0, -12, 0], rotate: [-8, -4, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.img
          src="/sentinelle.png"
          alt="Avatar Sentinelle"
          className="absolute bottom-6 xl:bottom-8 -left-1 xl:left-6 w-18 lg:w-22 xl:w-28 opacity-65 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          initial={{ rotate: 7 }}
          animate={{ y: [0, 12, 0], rotate: [7, 3, 7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        <motion.img
          src="/diplomate.png"
          alt="Avatar Diplomate"
          className="absolute top-2 xl:top-6 -right-2 xl:right-4 w-22 lg:w-26 xl:w-32 opacity-65 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          initial={{ rotate: 8 }}
          animate={{ y: [0, 14, 0], rotate: [8, 4, 8] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />

        <motion.img
          src="/explorateur.png"
          alt="Avatar Explorateur"
          className="absolute bottom-6 xl:bottom-8 -right-1 xl:right-6 w-18 lg:w-22 xl:w-28 opacity-65 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          initial={{ rotate: -7 }}
          animate={{ y: [0, -14, 0], rotate: [-7, -3, -7] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <div className="group inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1.5 font-sans text-xs font-medium transition-all duration-300 hover:border-[#e9c349]/60 hover:bg-[#e9c349]/20 hover:shadow-[0_0_15px_rgba(233,195,73,0.15)] sm:text-sm">
          <AnimatedShinyText className="inline-flex items-center justify-center gap-2 text-[#e9c349]">
            <Fingerprint className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('hero.badge')}</span>
          </AnimatedShinyText>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="max-w-2xl font-serif text-3xl font-normal leading-[1.18] tracking-tight text-[#c9ebd0] sm:text-4xl md:text-[44px] lg:text-[50px]"
      >
        {t('hero.titlePart1')}
        <br />
        {t('hero.titlePart2')}
        <br />
        <span className="text-[#e9c349]">
          {t('hero.titleSoulCoach')}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="mx-auto max-w-2xl px-4 font-sans text-base leading-relaxed text-[#c8c5d0] sm:px-0 sm:text-base md:text-lg"
      >
        {t('hero.description')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 sm:flex-row"
      >
        <Button
          asChild
          className="group relative h-12 overflow-hidden rounded-full bg-[#e9c349] px-8 font-sans text-sm font-semibold text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] transition-all duration-500 hover:bg-[#f6d773] hover:shadow-[0_0_40px_rgba(233,195,73,0.6)] active:scale-[0.98] sm:text-base"
        >
          <Link to="/test">
            <span className="relative z-10 flex items-center">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
              <div className="h-full w-[200%] translate-x-[-150%] skew-x-[-15deg] bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
            </div>
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 sm:pt-1 font-sans text-xs text-[#c8c5d0]/75"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[#e9c349]">✓</span>
          <span>{t('hero.guarantee1')}</span>
        </div>
        <div className="hidden h-3 w-px bg-white/10 sm:block" />
        <div className="flex items-center gap-1.5">
          <span className="text-[#e9c349]">✓</span>
          <span>{t('hero.guarantee2')}</span>
        </div>
        <div className="hidden h-3 w-px bg-white/10 sm:block" />
        <div className="flex items-center gap-1.5">
          <span className="text-[#e9c349]">✓</span>
          <span>{t('hero.guarantee3')}</span>
        </div>
      </motion.div>
    </section>
  )
}
