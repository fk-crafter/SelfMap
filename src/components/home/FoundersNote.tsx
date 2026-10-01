import { motion } from 'motion/react'
import { Quote, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function FoundersNote() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 mt-28 sm:mt-36 flex w-full max-w-4xl flex-col items-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full overflow-hidden rounded-3xl border border-[#e9c349]/20 bg-[rgba(197,192,254,0.015)] p-8 sm:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(233,195,73,0.05)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e9c349] opacity-10 blur-[80px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#c5c0fe] opacity-5 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349]">
              <Quote className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e9c349]">
              {t('founder.badge')}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#c9ebd0] leading-snug">
            {t('founder.title')}
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#c8c5d0]/80">
            <p>{t('founder.p1')}</p>
            <p>{t('founder.p2')}</p>
          </div>

          <div className="pt-2 flex items-center gap-3 border-t border-white/5 w-full">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#e9c349] to-[#c5c0fe] text-[#001809] font-bold text-xs shadow-md">
              <Sparkles className="h-4 w-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#c9ebd0]">{t('founder.author')}</p>
              <p className="text-[11px] text-[#c8c5d0]/50">{t('founder.role')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
