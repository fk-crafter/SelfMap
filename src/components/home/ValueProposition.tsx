import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { X, Check, Brain, Fingerprint } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function ValueProposition() {
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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
    <section className="relative z-10 mt-32 flex w-full max-w-5xl flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-20 text-center"
      >
        <h2 className="font-serif text-4xl font-normal text-[#c9ebd0] sm:text-5xl md:text-6xl">
          Why settle for a{' '}
          <span className="text-[#c8c5d0]/50 line-through">static</span> result?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#c8c5d0] sm:text-xl">
          Personality tests are great, but they are just the beginning. Your
          inner world is a living ecosystem, not a PDF report.
        </p>
      </motion.div>

      <div className="mx-auto flex w-full flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto_1.1fr] lg:items-stretch lg:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex w-full"
        >
          <Card className="flex w-full flex-col border border-white/5 bg-[rgba(197,192,254,0.01)] p-8 opacity-80 backdrop-blur-md transition-opacity duration-300 hover:opacity-100 lg:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#c8c5d0]/40 transition-colors duration-300 hover:text-[#c8c5d0]/70">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mb-8 font-serif text-2xl text-[#c8c5d0]/60">
              Traditional Tests
            </h3>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-[#c8c5d0]/50"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/40" />
                <span>
                  You read your results once and forget them in a drawer.
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-[#c8c5d0]/50"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/40" />
                <span>
                  Generic, copy-pasted advice meant for millions of people.
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3 text-[#c8c5d0]/50"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]/40" />
                <span>
                  Static labels that don't account for your daily personal
                  growth.
                </span>
              </motion.li>
            </motion.ul>
          </Card>
        </motion.div>

        <div className="hidden w-16 flex-col items-center justify-center lg:flex">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <div className="absolute top-0 h-full w-px bg-linear-to-b from-transparent via-[#e9c349]/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#e9c349]/30 bg-[#001809] text-xs font-bold text-[#c8c5d0]"
            >
              VS
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex w-full"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex w-full"
          >
            <Card className="group relative flex w-full flex-col overflow-hidden border border-[#e9c349]/30 bg-linear-to-b from-[#e9c349]/10 to-transparent p-8 shadow-[0_0_40px_rgba(233,195,73,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-[#e9c349]/60 hover:shadow-[0_0_60px_rgba(233,195,73,0.2)] lg:scale-105 lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e9c349] opacity-10 blur-[80px] transition-opacity duration-500 group-hover:opacity-20" />

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e9c349]/20 text-[#e9c349] shadow-[0_0_15px_rgba(233,195,73,0.2)]">
                  <Fingerprint className="h-7 w-7" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-1 text-xs font-semibold text-[#e9c349]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e9c349] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e9c349]"></span>
                  </span>
                  Living System
                </div>
              </div>

              <h3 className="mb-8 font-serif text-3xl text-[#e9c349]">
                SoulType Journey
              </h3>

              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-6"
              >
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-4 text-base text-[#c9ebd0] sm:text-lg"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                    <Check className="h-3.5 w-3.5 text-[#e9c349]" />
                  </div>
                  <span>
                    A living AI coach that remembers past conversations and
                    adapts.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-4 text-base text-[#c9ebd0] sm:text-lg"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                    <Check className="h-3.5 w-3.5 text-[#e9c349]" />
                  </div>
                  <span>
                    Hyper-personalized insights extracted directly from your
                    inner journal.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-4 text-base text-[#c9ebd0] sm:text-lg"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9c349]/20">
                    <Check className="h-3.5 w-3.5 text-[#e9c349]" />
                  </div>
                  <span>
                    Dynamic calibration mapping your evolution in real-time.
                  </span>
                </motion.li>
              </motion.ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
