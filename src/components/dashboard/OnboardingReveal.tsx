import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

interface OnboardingRevealProps {
  avatarUrl: string
  onComplete: () => void
}

export function OnboardingReveal({
  avatarUrl,
  onComplete,
}: OnboardingRevealProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001809]/95 px-4 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[#c5c0fe] opacity-5 blur-[120px] pointer-events-none" />

      <motion.div
        layout
        initial={{ borderRadius: '50%' }}
        animate={{ borderRadius: isExpanded ? '24px' : '50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col overflow-hidden border border-white/10 bg-[#c5c0fe]/5 shadow-2xl sm:flex-row"
      >
        <motion.div
          layout
          className="relative h-64 w-64 shrink-0 sm:h-80 sm:w-80"
        >
          <img
            src={avatarUrl}
            alt="Soul Coach Avatar"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,24,9,0.4)] pointer-events-none" />
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex w-full flex-col justify-center p-8 sm:w-[420px]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#e9c349]/10 text-[#e9c349]">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mb-3 font-serif text-3xl font-normal text-[#c9ebd0]">
                Meet your Soul Coach
              </h2>

              <p className="mb-8 text-sm leading-relaxed text-[#c8c5d0]">
                Forged from your psychological essence, this unique avatar
                embodies your personality. It was custom-generated to guide and
                evolve with you throughout your introspective journey.
              </p>

              <Button
                onClick={onComplete}
                className="group flex h-12 w-full items-center justify-center rounded-full bg-[#c5c0fe] text-sm font-semibold text-[#001809] transition-all hover:bg-[#c5c0fe]/90 active:scale-95"
              >
                Enter my space
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
