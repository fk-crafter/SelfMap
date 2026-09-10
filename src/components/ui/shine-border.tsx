"use client"

import { cn } from "@/lib/utils"
import React from "react"

export interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: string | string[]
  className?: string
  children: React.ReactNode
}

export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] bg-transparent text-white p-3",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `conic-gradient(from transparent 270deg, ${
              Array.isArray(color) ? color.join(", ") : color
            } 360deg)`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none before:bg-shine-size before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[\"\"] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine",
        )}
      />
      {children}
    </div>
  )
}
