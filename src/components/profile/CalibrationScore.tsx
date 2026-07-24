import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

interface CalibrationScoreProps {
  score: number
}

export function CalibrationScore({ score }: CalibrationScoreProps) {
  const normalizedScore = Math.min(Math.max(score, 0), 100)
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference - (normalizedScore / 100) * circumference

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#e9c349]" />
        <h3 className="font-serif text-xl text-[#c9ebd0]">Soul Calibration</h3>
      </div>

      <div className="relative mb-2 flex h-32 w-32 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-[#e9c349]"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-serif text-3xl text-[#e9c349]">
            {normalizedScore}%
          </span>
        </div>
      </div>

      <p className="mt-4 max-w-[220px] text-center text-xs text-[#c8c5d0]/70">
        Depth of psychological alignment based on your continuous interactions.
      </p>
    </div>
  )
}
