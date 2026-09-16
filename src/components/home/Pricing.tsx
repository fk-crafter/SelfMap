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

export function Pricing() {
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
          Choose Your Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          Start your introspection for free, or unlock the full cognitive
          potential of your AI Soul Coach.
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
                <h3 className="font-serif text-2xl text-[#c9ebd0]">Seeker</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#c8c5d0]/70">
                  For the curious minds beginning their path.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#c9ebd0]">
                    Free
                  </span>
                </div>
                <div className="mt-1 h-4" />
              </div>

              <ul className="mb-10 flex flex-1 flex-col gap-5">
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>Deep MBTI Cognitive Assessment</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>Standard 3D Generative Avatar</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c8c5d0]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9ebd0]/50" />
                  <span>10 Daily Coach Interactions</span>
                </li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="mt-auto h-12 w-full rounded-full border-white/10 bg-transparent font-semibold tracking-wide text-[#c9ebd0] hover:bg-white/5"
              >
                <Link to="/test">Start Free</Link>
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
                  The Sanctuary
                </div>

                {/* Mini Toggle Intégré */}
                <div className="flex items-center gap-2 rounded-full border border-white/5 bg-black/20 p-1 backdrop-blur-md">
                  <span
                    className={`pl-2 text-[10px] font-medium transition-colors ${!isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                  >
                    Mo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full bg-white/10 transition-colors duration-300 ease-in-out focus:outline-none"
                  >
                    <span
                      className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-[#e9c349] transition duration-300 ease-in-out ${isYearly ? 'translate-x-4' : 'translate-x-1'}`}
                    />
                  </button>
                  <span
                    className={`pr-1 text-[10px] font-medium transition-colors ${isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                  >
                    Yr
                  </span>
                </div>
              </div>

              <div className="mb-8 mt-2">
                <h3 className="font-serif text-2xl text-[#e9c349]">Awakened</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#c8c5d0]/70">
                  Unrestricted access to continuous cognitive evolution.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#e9c349]">
                    ${isYearly ? '10' : '15'}
                  </span>
                  <span className="text-sm text-[#c8c5d0]/70">/month</span>
                </div>
                <div className="mt-1 flex h-4 items-center gap-2">
                  {isYearly && (
                    <>
                      <span className="text-xs text-[#c8c5d0]/50">
                        Billed $120 annually
                      </span>
                      <span className="rounded-full bg-[#e9c349]/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#e9c349]">
                        Save 33%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="mb-10 flex flex-1 flex-col gap-5">
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <InfinityIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>Unlimited AI Coach Interactions</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Brain className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>Infinite Memory & Deep Context</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>Advanced Psychological Insights</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#c9ebd0]">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#e9c349]" />
                  <span>Priority Server Processing</span>
                </li>
              </ul>

              <Button
                asChild
                className="mt-auto h-12 w-full rounded-full bg-[#e9c349] font-bold tracking-wider text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] hover:bg-[#e9c349]/90 active:scale-95"
              >
                <Link to="/test">Unlock Sanctuary</Link>
              </Button>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  )
}
