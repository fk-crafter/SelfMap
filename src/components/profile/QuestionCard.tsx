import { cn } from '@/lib/utils'

interface ApiQuestion {
  id: number
  dimension: 'E' | 'N' | 'T' | 'J' | 'A'
  direction: 'positive' | 'negative'
  question: string
}

interface QuestionCardProps {
  question: ApiQuestion
  onAnswer: (score: number) => void
}

export function QuestionCard({ onAnswer }: QuestionCardProps) {
  const options = [
    {
      value: 2,
      label: 'Agree',
      size: 'h-12 w-12 sm:h-14 sm:w-14',
      activeColor: 'bg-[#e9c349] shadow-[0_0_20px_#e9c349]',
    },
    {
      value: 1,
      label: 'Partially Agree',
      size: 'h-9 w-9 sm:h-10 sm:w-10',
      activeColor: 'bg-[#e9c349]/60 shadow-[0_0_15px_rgba(233,195,73,0.4)]',
    },
    {
      value: 0,
      label: 'Neutral',
      size: 'h-6 w-6 sm:h-7 sm:w-7',
      activeColor: 'bg-[#c8c5d0]/50 shadow-[0_0_10px_rgba(200,197,208,0.3)]',
    },
    {
      value: -1,
      label: 'Partially Disagree',
      size: 'h-9 w-9 sm:h-10 sm:w-10',
      activeColor: 'bg-[#ffb4ab]/60 shadow-[0_0_15px_rgba(255,180,171,0.4)]',
    },
    {
      value: -2,
      label: 'Disagree',
      size: 'h-12 w-12 sm:h-14 sm:w-14',
      activeColor: 'bg-[#ffb4ab] shadow-[0_0_20px_#ffb4ab]',
    },
  ]

  return (
    <div className="flex w-full max-w-xl flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-2">
        <span className="font-serif text-sm font-medium tracking-wide text-[#e9c349]/80">
          Agree
        </span>
        <span className="font-serif text-sm font-medium tracking-wide text-[#ffb4ab]/80">
          Disagree
        </span>
      </div>

      <div className="flex w-full items-center justify-between gap-2 px-1">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            title={option.label}
            className={cn(
              'rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#e9c349]/30',
              option.size,
              index <= 1
                ? 'hover:border-[#e9c349]/40 hover:bg-[#e9c349]/5'
                : '',
              index === 2
                ? 'hover:border-[#c8c5d0]/40 hover:bg-[#c8c5d0]/5'
                : '',
              index >= 3
                ? 'hover:border-[#ffb4ab]/40 hover:bg-[#ffb4ab]/5'
                : '',
            )}
          />
        ))}
      </div>
    </div>
  )
}
