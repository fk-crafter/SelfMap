import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { X, Check, Brain, Bot, Fingerprint } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export function ValueProposition() {
  const { t } = useTranslation()

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative z-10 mt-24 sm:mt-32 flex w-full max-w-6xl flex-col items-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 sm:mb-12 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#e9c349]">
          <span>{t('value.badge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#c9ebd0]">
          {t('value.titlePart1')}{' '}
          <span className="text-[#c8c5d0]/50 line-through">{t('value.titleStatic')}</span>{' '}
          {t('value.titlePart2')}
        </h2>
        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-xl text-[#c8c5d0]">
          {t('value.subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="mx-auto mb-10 grid w-full max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2"
      >
        <div className="rounded-[1.5rem] border border-[#e9c349]/20 bg-[#e9c349]/[0.04] p-5 backdrop-blur-md">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#e9c349]">
            ✦ {t('hero.whyLabel')}
          </span>
          <p className="text-sm leading-relaxed text-[#c9ebd0]/90">
            {t('hero.whyText')}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-[#c5c0fe]/20 bg-[#c5c0fe]/[0.04] p-5 backdrop-blur-md">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5c0fe]">
            ✦ {t('hero.howLabel')}
          </span>
          <p className="text-sm leading-relaxed text-[#c9ebd0]/90">
            {t('hero.howText')}
          </p>
        </div>
      </motion.div>

      <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex w-full"
        >
          <Card className="flex w-full flex-col rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.015)] p-6 sm:p-8 opacity-85 backdrop-blur-md transition-opacity duration-300 hover:opacity-100">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#c8c5d0]/50">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#c8c5d0]/80">
              {t('value.traditionalTitle')}
            </h3>
            <p className="mt-1 mb-6 text-xs font-medium uppercase tracking-wider text-[#c8c5d0]/40">
              {t('value.traditionalSub')}
            </p>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.traditionalPoint1')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.traditionalPoint2')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.traditionalPoint3')}</span>
              </motion.li>
            </motion.ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex w-full"
        >
          <Card className="flex w-full flex-col rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.015)] p-6 sm:p-8 opacity-85 backdrop-blur-md transition-opacity duration-300 hover:opacity-100">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#c8c5d0]/50">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#c8c5d0]/80">
              {t('value.genericAiTitle')}
            </h3>
            <p className="mt-1 mb-6 text-xs font-medium uppercase tracking-wider text-[#c8c5d0]/40">
              {t('value.genericAiSub')}
            </p>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.genericAiPoint1')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.genericAiPoint2')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-[#c8c5d0]/60 leading-relaxed"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ab]/50" />
                <span>{t('value.genericAiPoint3')}</span>
              </motion.li>
            </motion.ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="flex w-full"
        >
          <Card className="group relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-[#e9c349]/40 bg-linear-to-b from-[#e9c349]/12 to-transparent p-6 sm:p-8 shadow-[0_0_40px_rgba(233,195,73,0.12)] backdrop-blur-xl transition-all duration-500 hover:border-[#e9c349]/70 hover:shadow-[0_0_60px_rgba(233,195,73,0.22)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e9c349] opacity-10 blur-[80px] transition-opacity duration-500 group-hover:opacity-20" />

            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9c349]/20 text-[#e9c349] shadow-[0_0_15px_rgba(233,195,73,0.2)]">
                <Fingerprint className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-1 text-[11px] font-semibold text-[#e9c349]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e9c349] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e9c349]"></span>
                </span>
                {t('value.soultypeBadge')}
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#e9c349]">
              {t('value.soultypeTitle')}
            </h3>
            <p className="mt-1 mb-6 text-xs font-medium uppercase tracking-wider text-[#e9c349]/70">
              {t('value.soultypeSub')}
            </p>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3.5 text-sm sm:text-base text-[#c9ebd0] leading-relaxed"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                  <Check className="h-3 w-3 text-[#e9c349]" />
                </div>
                <span>{t('value.soultypePoint1')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3.5 text-sm sm:text-base text-[#c9ebd0] leading-relaxed"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                  <Check className="h-3 w-3 text-[#e9c349]" />
                </div>
                <span>{t('value.soultypePoint2')}</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3.5 text-sm sm:text-base text-[#c9ebd0] leading-relaxed"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                  <Check className="h-3 w-3 text-[#e9c349]" />
                </div>
                <span>{t('value.soultypePoint3')}</span>
              </motion.li>
            </motion.ul>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
