import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

interface ProgressJaugeProps {
  score: number
}

export function ProgressJauge({ score }: ProgressJaugeProps) {
  const normalizedScore = Math.min(Math.max(score, 0), 100)

  return (
    <div className="flex flex-col items-end gap-1 ml-auto shrink-0">
      <div className="flex items-center gap-1 text-[#e9c349] whitespace-nowrap">
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
          CALIBRATION
        </span>
        <span className="text-[10px] sm:text-xs font-bold font-mono ml-0.5">
          {normalizedScore}%
        </span>
      </div>

      <div className="h-1.5 w-20 sm:w-32 md:w-48 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-[#e9c349]/50 to-[#e9c349] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
      </div>
    </div>
  )
}
