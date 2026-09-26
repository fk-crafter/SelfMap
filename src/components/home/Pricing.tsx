import { motion } from 'motion/react'
import { useState } from 'react'
import {
  Check,
  Sparkles,
  Infinity as InfinityIcon,
  Brain,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { MagicCard } from '@/components/ui/magic-card'
import { useTranslation } from 'react-i18next'

export function Pricing() {
  const { t } = useTranslation()
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section className="relative z-10 mt-32 flex w-full flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h2 className="font-serif text-3xl font-normal text-[#c9ebd0] sm:text-4xl md:text-5xl">
          {t('pricing.heading')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          {t('pricing.subheading')}
        </p>
      </motion.div>

      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-6 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-95"
        >
          <MagicCard
            gradientColor="rgba(201, 235, 208, 0.15)"
            className="flex h-full w-full flex-col backdrop-blur-xl"
          >
            <div className="flex h-full flex-col">
              <div className="mb-8 mt-4">
                <h3 className="font-serif text-2xl text-[#c9ebd0]">{t('pricing.seekerTitle')}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#c8c5d0]/70">
                  {t('pricing.seekerSubtitle')}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#c9ebd0]">
                    {t('pricing.free')}
                  </span>
                </div>
                <div className="mt-1 h-4" />
              </div>

              <ul className="mb-10 flex flex-1 flex-col gap-5">
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>{t('pricing.seekerFeature1')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>{t('pricing.seekerFeature2')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>{t('pricing.seekerFeature3')}</span>
                </li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="mt-auto h-12 w-full rounded-full border-white/10 bg-transparent font-semibold tracking-wide text-[#c9ebd0] hover:bg-white/5"
              >
                <Link to="/test">{t('pricing.startFree')}</Link>
              </Button>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-95 md:scale-105"
        >
          <MagicCard
            gradientColor="rgba(233, 195, 73, 0.2)"
            className="flex h-full w-full flex-col border-[#e9c349]/30 bg-[rgba(233,195,73,0.02)] shadow-[0_0_40px_rgba(233,195,73,0.15)] backdrop-blur-xl"
          >
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e9c349]">
                  {t('pricing.sanctuaryTag')}
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-md whitespace-nowrap">
                  <span
                    className={`text-[11px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors ${!isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                  >
                    Mo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full bg-white/10 transition-colors duration-300 ease-in-out focus:outline-none"
                    aria-label="Switch between monthly and annual"
                  >
                    <span
                      className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-[#e9c349] transition duration-300 ease-in-out ${isYearly ? 'translate-x-4' : 'translate-x-1'}`}
                    />
                  </button>
                  <span
                    className={`text-[11px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors ${isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                  >
                    Yr
                  </span>
                </div>
              </div>

              <div className="mb-8 mt-2">
                <h3 className="font-serif text-2xl text-[#e9c349]">{t('pricing.sanctuaryTitle')}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#c8c5d0]/70">
                  {t('pricing.sanctuarySubtitle')}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#e9c349]">
                    ${isYearly ? '12' : '15'}
                  </span>
                  <span className="text-sm text-[#c8c5d0]/70">{t('pricing.perMonth')}</span>
                </div>
                <div className="mt-1 flex h-4 items-center gap-2">
                  {isYearly && (
                    <>
                      <span className="text-xs text-[#c8c5d0]/50">
                        {t('pricing.billedAnnually')}
                      </span>
                      <span className="rounded-full bg-[#e9c349]/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#e9c349]">
                        {t('pricing.save20')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="mb-10 flex flex-1 flex-col gap-5">
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <InfinityIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>{t('pricing.sanctuaryFeature1')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Brain className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>{t('pricing.sanctuaryFeature2')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>{t('pricing.sanctuaryFeature3')}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>{t('pricing.sanctuaryFeature4')}</span>
                </li>
              </ul>

              <Button
                asChild
                className="mt-auto h-12 w-full rounded-full bg-[#e9c349] font-bold tracking-wider text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] hover:bg-[#e9c349]/90 active:scale-95"
              >
                <Link to="/test">{t('pricing.unlockSanctuary')}</Link>
              </Button>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  )
}
