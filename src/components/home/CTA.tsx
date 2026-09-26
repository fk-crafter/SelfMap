import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { useTranslation } from 'react-i18next'

export function CTA() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 mb-10 mt-24 flex w-full max-w-4xl flex-col items-center px-4 text-center sm:mt-32 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl border border-[#e9c349]/20 bg-[rgba(233,195,73,0.02)] px-4 py-5 backdrop-blur-xl sm:rounded-3xl sm:px-12 sm:py-16 md:p-20"
      >
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#e9c349]/5 to-transparent" />
        <div className="absolute -top-40 left-1/2 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e9c349] opacity-20 blur-[100px]" />
        <BorderBeam duration={10} colorFrom="#e9c349" colorTo="#c5c0fe" />

        <h2 className="relative z-10 font-serif text-2xl font-normal leading-tight text-[#c9ebd0] sm:text-4xl md:text-6xl">
          {t('cta.titlePart1')}{' '}
          <span className="text-[#e9c349]">{t('cta.titleHighlight')}</span>
          {t('cta.titlePart2')}
        </h2>
        <p className="relative z-10 mx-auto mt-2 max-w-xl text-[13px] leading-snug text-[#c8c5d0] sm:mt-6 sm:text-lg sm:leading-relaxed">
          {t('cta.subtitle')}
        </p>
        <div className="relative z-10 mt-4 sm:mt-10">
          <Button
            asChild
            className="h-10 rounded-full bg-[#e9c349] px-5 text-sm font-bold text-[#001809] shadow-[0_0_30px_rgba(233,195,73,0.3)] transition-transform hover:scale-105 hover:bg-[#e9c349]/90 active:scale-95 sm:h-14 sm:px-10 sm:text-lg"
          >
            <Link to="/test">
              {t('cta.button')}{' '}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
