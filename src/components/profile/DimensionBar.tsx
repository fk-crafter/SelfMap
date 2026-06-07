import { cn } from '@/lib/utils'

interface DimensionBarProps {
  leftLabel: string
  rightLabel: string
  leftValue: number
  rightValue: number
  colorClass: string
}

export function DimensionBar({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  colorClass,
}: DimensionBarProps) {
  const isLeftDominant = leftValue >= rightValue

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span
          className={cn(
            'text-xs font-bold tracking-widest uppercase transition-colors',
            isLeftDominant ? 'text-[#e9c349]' : 'text-[#c8c5d0]/40',
          )}
        >
          {leftLabel} {leftValue}%
        </span>
        <span
          className={cn(
            'text-xs font-bold tracking-widest uppercase transition-colors',
            !isLeftDominant ? 'text-[#e9c349]' : 'text-[#c8c5d0]/40',
          )}
        >
          {rightValue}% {rightLabel}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5 shadow-inner">
        <div
          className={cn(
            'absolute bottom-0 left-0 top-0 rounded-full transition-all duration-1000',
            colorClass,
          )}
          style={{ width: `${leftValue}%` }}
        />
      </div>
    </div>
  )
}
