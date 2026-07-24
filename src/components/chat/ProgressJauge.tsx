import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

interface ProgressJaugeProps {
  score: number
}

export function ProgressJauge({ score }: ProgressJaugeProps) {
  const normalizedScore = Math.min(Math.max(score, 0), 100)

  return (
    <div className="flex flex-col items-end gap-1.5 ml-auto">
      <div className="flex items-center gap-1.5 text-[#e9c349]">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="text-xs font-medium tracking-wide">CALIBRATION</span>
        <span className="text-xs font-bold font-mono ml-1">
          {normalizedScore}%
        </span>
      </div>

      <div className="h-1.5 w-32 md:w-48 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
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
