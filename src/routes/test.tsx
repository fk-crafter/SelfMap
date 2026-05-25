import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { QuestionCard } from '@/components/profile/QuestionCard'
import { useState } from 'react'
import { useUserStore } from '@/store/userStore'

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
  const navigate = useNavigate({ from: '/test' })
  const setProfile = useUserStore((state) => state.setProfile)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [isFinished, setIsFinished] = useState(false)

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentIndex]

    const newAnswers = {
      ...userAnswers,
      [currentQuestion.id]: answer,
    }

    setUserAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)

      const isExtravert = newAnswers[1] === 'Sortir'
      const isThinking = newAnswers[2] === 'Logique'
      const isJudging = newAnswers[3] === 'Oui, tout'

      const computedType = `${isExtravert ? 'E' : 'I'}N${isThinking ? 'T' : 'F'}${isJudging ? 'J' : 'P'}`

      setProfile({
        name: 'Alex',
        type: computedType,
        insight: `En tant que ${computedType}, ton approche unique est ta force. Concentre-toi sur tes objectifs aujourd'hui.`,
        avatarSeed: computedType,
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      navigate({ to: '/dashboard' })
    }
  }

  if (isFinished) {
    return (
      <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Analyse en cours...</h1>
            <p className="text-muted-foreground">
              Nous configurons ton coach IA en fonction de tes réponses.
            </p>
          </div>
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
