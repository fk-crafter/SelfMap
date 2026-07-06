import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

export function OnboardingReveal({
  avatarUrl,
  onComplete,
}: {
  avatarUrl: string
  onComplete: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#001809] px-6">
      <div className="absolute inset-0 bg-[#c5c0fe]/5 blur-[120px]" />

      <img
        src={avatarUrl}
        alt="Coach loader"
        onLoad={() => setIsLoaded(true)}
        className="hidden"
      />

      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <div className="mb-8 h-64 w-64 overflow-hidden rounded-full border border-white/10 shadow-[0_0_60px_rgba(197,192,254,0.15)]">
            <img
              src={avatarUrl}
              alt="Soul Coach Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 font-serif text-3xl text-[#c9ebd0]"
          >
            Your Soul Coach is ready.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onComplete}
              className="rounded-full bg-[#e9c349] px-8 py-6 text-sm font-bold tracking-wider text-[#001809] transition-transform hover:scale-105 hover:bg-[#e9c349]/90"
            >
              ENTER SANCTUARY
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="mb-6 h-8 w-8 animate-spin rounded-full border-2 border-[#e9c349] border-t-transparent" />
          <p className="animate-pulse text-sm font-medium tracking-widest text-[#c8c5d0] uppercase">
            Summoning Coach
          </p>
        </div>
      )}
    </div>
  )
}
