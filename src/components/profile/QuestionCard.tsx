import { cn } from '@/lib/utils'

interface ApiQuestion {
  id: number
  dimension: string
  question: string
  answers: {
    title: string
    description: string
  }[]
}

interface QuestionCardProps {
  question: ApiQuestion
  onAnswer: (answerTitle: string) => void
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswer(answer.title)}
          className={cn(
            'group flex w-full max-w-2xl flex-row items-center gap-6 rounded-3xl bg-white p-6 text-left shadow-sm transition-all hover:bg-neutral-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1D1B4B]/20 border border-transparent hover:border-[#1D1B4B]/10 active:scale-[0.98]',
          )}
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-100 bg-[#F9F7FA] p-4 shadow-inner transition-transform group-hover:scale-105">
            <div className="h-full w-full rounded-full bg-linear-to-br from-[#1D1B4B]/40 to-[#1D1B4B]/80" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xl font-bold text-[#1D1B4B]">{answer.title}</h4>
            <p className="text-sm font-medium leading-relaxed text-[#1A1A1A]/60">
              {answer.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
