import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClipboardList, Hexagon, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

const steps = [
  {
    icon: ClipboardList,
    title: 'Take the Assessment',
    description:
      'Complete a deep psychological mapping based on cognitive functions to discover your true archetype.',
  },
  {
    icon: Hexagon,
    title: 'Summon Your Coach',
    description:
      'Watch your personalized 3D soul coach come to life, ready to match your energy and communication style.',
  },
  {
    icon: TrendingUp,
    title: 'Evolve Daily',
    description:
      'Chat, journal, and reflect. The AI adapts to your growth, raising your dynamic calibration score over time.',
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative z-10 mt-32 flex w-full flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-24 text-center"
      >
        <h2 className="font-serif text-4xl font-normal text-[#c9ebd0] sm:text-5xl md:text-6xl">
          The Path to Mastery
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#c8c5d0] sm:text-xl">
          Three simple steps to unlock your personalized inner sanctuary.
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
              className="w-full"
            >
              <Card className="group relative mx-auto flex w-full max-w-xl flex-col overflow-hidden border border-[#e9c349]/20 bg-[#001809] px-6 py-10 text-center transition-all duration-500 hover:border-[#e9c349]/50 hover:bg-[#021f0f] hover:shadow-[0_0_30px_rgba(233,195,73,0.1)] sm:px-10">
                <div className="pointer-events-none absolute -bottom-8 -right-4 select-none font-serif text-[150px] font-bold leading-none text-[#e9c349]/2 transition-colors duration-500 group-hover:text-[#e9c349]/10">
                  {index + 1}
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="mb-4 font-serif text-2xl text-[#c9ebd0] transition-colors duration-300 group-hover:text-[#e9c349]">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-[#c8c5d0]/70">
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
