import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { QuestionCard } from '@/components/profile/QuestionCard'

interface ApiQuestion {
  id: number
  dimension: string
  question: string
  answers: {
    title: string
    description: string
  }[]
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
          dimension: 'I/E',
          question: 'Tu préfères sortir ou rester chez toi ?',
          answers: [
            {
              title: 'Sortir',
              description: "L'interaction et l'action m'animent.",
            },
            {
              title: 'Rester',
              description:
                "Le calme et l'introspection sont mes sources d'énergie.",
            },
          ],
        },
        {
          id: 2,
          dimension: 'T/F',
          question: 'Es-tu plutôt logique ou émotionnel ?',
          answers: [
            {
              title: 'Logique',
              description: 'La raison guide mes choix et mes analyses.',
            },
            {
              title: 'Émotionnel',
              description: 'Je me fie à mon ressenti et à mon intuition.',
            },
          ],
        },
        {
          id: 3,
          dimension: 'J/P',
          question: 'Aimes-tu planifier ?',
          answers: [
            {
              title: 'Oui, tout',
              description: "L'organisation et la structure me rassurent.",
            },
            {
              title: "Non, j'improvise",
              description: "La spontanéité et l'adaptation sont mes forces.",
            },
          ],
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

  const handleAnswer = async (answerTitle: string) => {
    const currentQuestion = questions[currentIndex]

    const newAnswers = {
      ...userAnswers,
      [currentQuestion.id]: answerTitle,
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-[#1A1A1A] md:p-10">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#1D1B4B]" />
          <div>
            <h1 className="mb-2 text-3xl font-bold text-[#1D1B4B]">
              Analyse en cours...
            </h1>
            <p className="text-[#1A1A1A]/70">
              Nous configurons ton coach IA en fonction de tes réponses.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="z-10 flex shrink-0 flex-row items-center justify-between px-6 py-6">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 rounded-full py-2 text-sm font-semibold text-[#1D1B4B] transition-all hover:opacity-70 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour
        </Link>
        <p className="text-xs font-semibold tracking-widest text-[#1A1A1A]/40 uppercase">
          {currentIndex + 1} / {questions.length}
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center overflow-y-auto p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-12 pt-8 pb-32">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs font-bold tracking-widest text-[#1A1A1A]/50 uppercase">
              Dimension {currentQuestion.dimension}
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#1D1B4B] md:text-4xl">
              {currentQuestion.question}
            </h2>
          </div>

          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-4 bg-linear-to-t from-[#F9F7FA] via-[#F9F7FA] to-transparent px-6 py-8 text-center">
        <p className="max-w-md text-sm font-light italic text-[#1A1A1A]/50">
          Répondez avec votre première intuition. Il n'y a pas de mauvaise
          réponse, seulement votre vérité.
        </p>
      </footer>
    </div>
  )
}
