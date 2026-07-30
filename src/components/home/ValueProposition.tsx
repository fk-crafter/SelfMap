import { motion } from 'motion/react'
import { X, Check, Brain, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function ValueProposition() {
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
          Why settle for a static result?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          Personality tests are great, but they are just the beginning. Your
          inner world is not a static PDF report.
        </p>
      </motion.div>

      <div className="grid w-full gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="flex h-full flex-col border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 backdrop-blur-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#c8c5d0]/50">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mb-6 font-serif text-2xl text-[#c8c5d0]/70">
              Traditional Tests
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[#c8c5d0]/60">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/50" />
                <span>You read your results once and forget them.</span>
              </li>
              <li className="flex items-start gap-3 text-[#c8c5d0]/60">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/50" />
                <span>Generic advice meant for millions of people.</span>
              </li>
              <li className="flex items-start gap-3 text-[#c8c5d0]/60">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/50" />
                <span>
                  Static labels that don't account for personal growth.
                </span>
              </li>
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <Card className="relative flex h-full flex-col overflow-hidden border border-[#e9c349]/20 bg-[rgba(233,195,73,0.03)] p-8 shadow-[0_0_30px_rgba(233,195,73,0.05)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#e9c349] opacity-20 blur-2xl" />
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9c349]/10 text-[#e9c349]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mb-6 font-serif text-2xl text-[#e9c349]">
              SoulType Journey
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>
                  A living AI coach that remembers your past conversations.
                </span>
              </li>
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>
                  Hyper-personalized insights based on your inner journal.
                </span>
              </li>
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>Dynamic calibration that evolves as you grow.</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
