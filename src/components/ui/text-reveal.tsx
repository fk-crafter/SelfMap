"use client"

import { FC, ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
}

export const TextRevealByWord: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end center"],
  })

  const words = text.split(" ")

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <p className={"flex flex-wrap p-5 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl"}>
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: any
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"])

  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity: opacity, filter: filter }} className="text-[#c9ebd0]">
        {children}
      </motion.span>
    </span>
  )
}
