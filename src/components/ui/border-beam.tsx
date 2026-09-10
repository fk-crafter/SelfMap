import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#e9c349",
  colorTo = "#c5c0fe",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
        maskImage: "linear-gradient(transparent,transparent), linear-gradient(white,white)",
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
        WebkitMaskImage: "linear-gradient(transparent,transparent), linear-gradient(white,white)",
        WebkitMaskClip: "padding-box, border-box",
        WebkitMaskComposite: "xor",
      } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-[length:calc(var(--border-width)*1px)] border-solid border-transparent",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_200px)]",
        className
      )}
    />
  )
}
