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
    <Card className="border-primary/10 shadow-md">
      <CardHeader>
        <CardTitle>
          Question {question.id} sur {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-lg font-medium text-foreground">
          {question.question}
        </p>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto justify-start whitespace-normal py-4 text-left"
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
