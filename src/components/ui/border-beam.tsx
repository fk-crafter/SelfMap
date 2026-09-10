"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  duration?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  borderRadius?: number
}

export const BorderBeam = ({
  className,
  duration = 10,
  colorFrom = "#e9c349",
  colorTo = "#c5c0fe",
  borderWidth = 1.5,
  borderRadius = 24,
}: BorderBeamProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      >
        <defs>
          <linearGradient id="gradient-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="50%" stopColor={colorTo} stopOpacity="1" />
            <stop offset="100%" stopColor={colorFrom} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx={borderRadius - borderWidth / 2}
          ry={borderRadius - borderWidth / 2}
          fill="none"
          stroke="url(#gradient-glow)"
          strokeWidth={borderWidth}
          pathLength="100"
          strokeDasharray="25 75"
          className="animate-border-beam-svg"
        />
      </svg>
    </div>
  )
}
