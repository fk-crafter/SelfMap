import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ApiQuestion {
  id: number
  question: string
  answers: string[]
}

interface QuestionCardProps {
  question: ApiQuestion
  totalQuestions: number
  onAnswer: (answer: string) => void
}

export function QuestionCard({
  question,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  return (
    <Card className="border-none bg-white shadow-xl shadow-[#1D1B4B]/5">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]/50">
          Question {question.id} sur {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-8 text-2xl font-bold text-[#1D1B4B]">
          {question.question}
        </p>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto justify-start whitespace-normal border-[#1D1B4B]/10 py-5 text-left text-lg text-[#1A1A1A] hover:bg-[#1D1B4B]/5 hover:text-[#1D1B4B]"
              onClick={() => onAnswer(answer)}
            >
              {answer}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
