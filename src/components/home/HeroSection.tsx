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
    <section className="relative z-10 flex w-full max-w-5xl flex-col items-center pt-1 pb-14 text-center sm:pb-20">
      {/* Background ambient particles */}
      <div className="pointer-events-none absolute inset-0 -z-20 h-full w-full">
        <Particles
          className="absolute inset-0 z-0 h-full w-full"
          quantity={120}
          ease={80}
          color="#c5c0fe"
          staticity={40}
        />
      </div>

      {/* Floating Archetype Avatars framing the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto hidden w-full max-w-7xl lg:block">
        <motion.img
          src="/analyste.png"
          alt="Avatar Analyste"
          className="absolute top-16 left-4 xl:left-8 w-28 xl:w-36 opacity-35 mix-blend-luminosity"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src="/diplomate.png"
          alt="Avatar Diplomate"
          className="absolute top-24 right-4 xl:right-8 w-32 xl:w-40 opacity-35 mix-blend-luminosity"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 mb-3 sm:mb-4 flex items-center justify-center"
      >
        <div className="group inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3.5 py-1 font-sans text-xs font-medium transition-all duration-300 hover:border-[#e9c349]/60 hover:bg-[#e9c349]/20 hover:shadow-[0_0_15px_rgba(233,195,73,0.15)] sm:text-sm">
          <AnimatedShinyText className="inline-flex items-center justify-center gap-2 text-[#e9c349]">
            <Fingerprint className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>{t('hero.badge')}</span>
          </AnimatedShinyText>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        className="mb-3 sm:mb-4 max-w-4xl font-serif text-3xl font-normal leading-[1.12] tracking-tight text-[#c9ebd0] sm:text-5xl md:text-[52px] lg:text-[58px]"
      >
        {t('hero.titlePart1')}{' '}
        <span className="whitespace-nowrap text-[#e9c349]">
          {t('hero.titleSoulCoach')}
        </span>
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        {t('hero.titlePart2')}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
        className="mx-auto mb-5 sm:mb-6 max-w-xl px-2 font-sans text-sm leading-relaxed text-[#c8c5d0]/90 sm:px-0 sm:text-base md:text-[17px]"
      >
        {t('hero.description')}
      </motion.p>

      {/* Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
        className="mb-4 sm:mb-5 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Button
          asChild
          className="group relative h-11 overflow-hidden rounded-full bg-[#e9c349] px-7 font-sans text-sm font-semibold text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] transition-all duration-500 hover:bg-[#f6d773] hover:shadow-[0_0_40px_rgba(233,195,73,0.6)] active:scale-[0.98] sm:h-12 sm:px-8 sm:text-base"
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

      {/* Guarantees (Cleanly visible on all desktops above fold) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs text-[#c8c5d0]/75"
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
