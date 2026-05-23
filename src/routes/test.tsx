import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { QuestionCard } from '@/components/profile/QuestionCard'
import { useState } from 'react'

interface ApiQuestion {
  id: number
  question: string
  answers: string[]
}

export const Route = createFileRoute('/test')({
  component: TestPage,
  head: () => ({
    meta: [{ title: 'SelfMap | Ton Test' }],
  }),
  loader: async () => {
    return {
      questions: [
        {
          id: 1,
          question: 'Tu préfères sortir ou rester chez toi ?',
          answers: ['Sortir', 'Rester'],
        },
        {
          id: 2,
          question: 'Es-tu plutôt logique ou émotionnel ?',
          answers: ['Logique', 'Émotionnel'],
        },
        {
          id: 3,
          question: 'Aimes-tu planifier ?',
          answers: ['Oui, tout', "Non, j'improvise"],
        },
      ] as ApiQuestion[],
    }
  },
})

function TestPage() {
  const { questions } = Route.useLoaderData()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [isFinished, setIsFinished] = useState(false)

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentIndex]

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    return (
      <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Test terminé !</h1>
          <p className="text-muted-foreground mb-8">
            Nous analysons tes résultats pour configurer ton coach IA.
          </p>

          <div className="bg-muted p-4 rounded-md text-left mb-8 overflow-auto">
            <pre className="text-sm font-mono">
              {JSON.stringify(userAnswers, null, 2)}
            </pre>
          </div>

          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <Button variant="ghost" asChild className="-ml-4 mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Ton Profil Psychologique
          </h1>
          <p className="text-muted-foreground mt-2">
            Réponds spontanément à ces questions pour calibrer ton coach IA.
          </p>
        </div>

        <QuestionCard
          question={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </main>
  )
}
