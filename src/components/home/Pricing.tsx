import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Pricing() {
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
          Choose Your Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          Start your introspection for free, or unlock the full potential of
          your AI Soul Coach.
        </p>
      </motion.div>

      <div className="grid w-full gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="flex h-full flex-col border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 backdrop-blur-xl">
            <div className="mb-8">
              <h3 className="font-serif text-2xl text-[#c9ebd0]">Seeker</h3>
              <p className="mt-2 text-[#c8c5d0]/70">
                For the curious minds starting their path.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#c9ebd0]">Free</span>
              </div>
            </div>

            <ul className="mb-8 flex flex-1 flex-col gap-4">
              <li className="flex items-start gap-3 text-[#c8c5d0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c9ebd0]/50" />
                <span>Deep MBTI Cognitive Assessment</span>
              </li>
              <li className="flex items-start gap-3 text-[#c8c5d0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c9ebd0]/50" />
                <span>Standard 3D Generative Avatar</span>
              </li>
              <li className="flex items-start gap-3 text-[#c8c5d0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c9ebd0]/50" />
                <span>10 Daily Coach Interactions</span>
              </li>
              <li className="flex items-start gap-3 text-[#c8c5d0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c9ebd0]/50" />
                <span>Basic Inner Journal</span>
              </li>
            </ul>

            <Button
              asChild
              variant="outline"
              className="w-full border-white/10 bg-transparent text-[#c9ebd0] hover:bg-white/5"
            >
              <Link to="/test">Start Free</Link>
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <Card className="relative flex h-full flex-col border border-[#e9c349]/30 bg-[rgba(233,195,73,0.03)] p-8 shadow-[0_0_30px_rgba(233,195,73,0.1)] backdrop-blur-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#e9c349] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#001809]">
              Recommended
            </div>

            <div className="mb-8 mt-2">
              <h3 className="font-serif text-2xl text-[#e9c349]">Awakened</h3>
              <p className="mt-2 text-[#c8c5d0]/70">
                For those seeking continuous, deep evolution.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#e9c349]">$5</span>
                <span className="text-[#c8c5d0]/70">/month</span>
              </div>
            </div>

            <ul className="mb-8 flex flex-1 flex-col gap-4">
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>Everything in Seeker, plus:</span>
              </li>
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>Unlimited AI Coach Interactions</span>
              </li>
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>Long-Term Memory & Context</span>
              </li>
              <li className="flex items-start gap-3 text-[#c9ebd0]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e9c349]" />
                <span>Advanced Weekly Psychological Insights</span>
              </li>
            </ul>

            <Button
              asChild
              className="w-full bg-[#e9c349] font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] hover:bg-[#e9c349]/90 active:scale-95"
            >
              <Link to="/test">Unlock Sanctuary</Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
