import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClipboardList, Hexagon, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: ClipboardList,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
    },
    {
      icon: Hexagon,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
    },
    {
      icon: TrendingUp,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
    },
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative z-10 mt-32 flex w-full flex-col items-center px-4 sm:px-6">
      <div className="absolute inset-0 z-0 h-full w-full opacity-30 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#e9c349"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-24 text-center relative z-10 px-2"
      >
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#c9ebd0]">
          {t('howItWorks.heading')}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-xl text-[#c8c5d0]">
          {t('howItWorks.subheading')}
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-16 py-10"
      >
        <div className="absolute bottom-0 left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-[#e9c349]/10" />

        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-linear-to-b from-[#e9c349] to-[#f6d773] shadow-[0_0_15px_rgba(233,195,73,0.6)]"
        />

        {steps.map((step, index) => (
          <div
            key={index}
            className="relative z-10 flex w-full flex-col items-center gap-8"
          >
            <motion.div
              initial={{ opacity: 0.2, filter: 'blur(10px)', scale: 0.8 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -45% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e9c349]/30 bg-[#001809] text-[#e9c349] shadow-[0_0_30px_rgba(233,195,73,0.15)]"
            >
              <step.icon className="h-7 w-7" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.2, filter: 'blur(15px)', y: 40 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '0px 0px -45% 0px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="w-full px-2 sm:px-0"
            >
              <Card className="group relative mx-auto flex w-full max-w-xl flex-col overflow-hidden border border-[#e9c349]/20 bg-[#001809] px-6 py-10 text-center transition-all duration-500 hover:border-[#e9c349]/50 hover:bg-[#021f0f] hover:shadow-[0_0_30px_rgba(233,195,73,0.1)] sm:px-10">
                <div className="pointer-events-none absolute -bottom-8 -right-4 select-none font-serif text-[150px] font-bold leading-none text-[#e9c349]/2 transition-colors duration-500 group-hover:text-[#e9c349]/10">
                  {index + 1}
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="mb-4 font-serif text-xl sm:text-2xl text-[#c9ebd0] transition-colors duration-300 group-hover:text-[#e9c349]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#c8c5d0]/70">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
