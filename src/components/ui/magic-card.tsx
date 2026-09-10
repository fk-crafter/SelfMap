"use client"

import { useMousePosition } from "@/lib/hooks/use-mouse-position"
import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "motion/react"
import type { ReactNode } from "react"
import { useEffect, useRef } from "react"

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  children: ReactNode
}

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = "rgba(233, 195, 73, 0.15)",
  gradientOpacity = 0.8,
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[rgba(197,192,254,0.02)] text-white",
        className
      )}
      {...props}
    >
      <div className="relative z-10 w-full p-8">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  )
}
