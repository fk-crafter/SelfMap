import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

type SoulLoaderProps = {
  label?: string
  sublabel?: string
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function SoulLoader({
  label,
  sublabel,
  fullScreen = false,
  size = 'md',
}: SoulLoaderProps) {
  const dimensions =
    size === 'sm'
      ? 'h-14 w-14'
      : size === 'lg'
        ? 'h-28 w-28'
        : 'h-20 w-20'

  const innerDimensions =
    size === 'sm'
      ? 'h-9 w-9'
      : size === 'lg'
        ? 'h-20 w-20'
        : 'h-14 w-14'

  const coreDimensions =
    size === 'sm'
      ? 'h-5 w-5'
      : size === 'lg'
        ? 'h-10 w-10'
        : 'h-7 w-7'

  const content = (
    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      <div className={`relative flex items-center justify-center ${dimensions}`}>
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[#e9c349]/25 blur-xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-[#e9c349]/35"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#e9c349] shadow-[0_0_12px_#e9c349]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className={`absolute rounded-full border border-[#c5c0fe]/35 ${innerDimensions}`}
        >
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c5c0fe] shadow-[0_0_10px_#c5c0fe]" />
        </motion.div>

        <motion.div
          animate={{ scale: [0.9, 1.12, 0.9], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className={`flex items-center justify-center rounded-xl border border-[#e9c349]/50 bg-[#e9c349]/15 text-[#e9c349] shadow-[0_0_25px_rgba(233,195,73,0.35)] ${coreDimensions}`}
        >
          <Sparkles className="h-3.5 w-3.5" />
        </motion.div>
      </div>

      {label && (
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 font-serif text-2xl sm:text-3xl font-normal text-[#e9c349]"
        >
          {label}
        </motion.h2>
      )}

      {sublabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 max-w-sm text-sm text-[#c8c5d0]/80"
        >
          {sublabel}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#001809] p-6 text-[#c9ebd0]">
        <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(233,195,73,0.08)_0%,transparent_70%)]" />
        {content}
      </div>
    )
  }

  return content
}
