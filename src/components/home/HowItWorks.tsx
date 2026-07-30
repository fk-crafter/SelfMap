import { motion } from 'motion/react'
import { ClipboardList, Sparkles, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: '1. Take the Assessment',
    description:
      'Complete a deep psychological mapping based on cognitive functions to discover your true archetype.',
  },
  {
    icon: Sparkles,
    title: '2. Summon Your Coach',
    description:
      'Watch your personalized 3D soul coach come to life, ready to match your energy and communication style.',
  },
  {
    icon: TrendingUp,
    title: '3. Evolve Daily',
    description:
      'Chat, journal, and reflect. The AI adapts to your growth, raising your dynamic calibration score over time.',
  },
]

export function HowItWorks() {
  return (
    <section className="relative z-10 mt-32 flex w-full max-w-5xl flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-16 text-center"
      >
        <h2 className="font-serif text-3xl font-normal text-[#c9ebd0] sm:text-4xl md:text-5xl">
          The Path to Mastery
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          Three simple steps to unlock your personalized inner sanctuary.
        </p>
      </motion.div>

      <div className="grid w-full gap-12 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[rgba(233,195,73,0.1)] text-[#e9c349] shadow-[0_0_15px_rgba(233,195,73,0.05)]">
              <step.icon className="h-8 w-8" />
            </div>
            <h3 className="mb-4 font-serif text-2xl text-[#c9ebd0]">
              {step.title}
            </h3>
            <p className="leading-relaxed text-[#c8c5d0]/70">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
