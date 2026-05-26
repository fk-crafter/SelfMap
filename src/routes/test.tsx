import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { QuestionCard } from '@/components/profile/QuestionCard'
import { questions as quizQuestions } from '../data/questions'

export const Route = createFileRoute('/test')({
  component: TestPage,
  head: () => ({
    meta: [{ title: 'SelfMap | Ton Test' }],
  }),
  loader: async () => {
    return { questions: quizQuestions }
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

      const scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }

      Object.entries(newAnswers).forEach(([idStr, answer]) => {
        const id = parseInt(idStr)
        const isAgree = answer === "D'accord"

        if (id <= 4) isAgree ? scores.E++ : scores.I++
        else if (id <= 8) isAgree ? scores.N++ : scores.S++
        else if (id <= 12) isAgree ? scores.F++ : scores.T++
        else if (id <= 16) isAgree ? scores.J++ : scores.P++
      })

      const computedType = `${scores.E >= scores.I ? 'E' : 'I'}${scores.N >= scores.S ? 'N' : 'S'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`

      setProfile({
        name: 'Explorateur',
        type: computedType,
        insight: `Ton profil ${computedType} se dessine. Ton coach affinera cette analyse au fil de vos échanges.`,
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

      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 pb-12">
          <div className="flex min-h-[160px] w-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-xs font-bold tracking-widest text-[#1A1A1A]/50 uppercase">
              Dimension {currentQuestion.dimension}
            </p>
            <h2 className="max-w-3xl text-2xl font-bold leading-tight text-[#1D1B4B] sm:text-3xl md:text-4xl">
              {currentQuestion.question}
            </h2>
          </div>

          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-4 bg-linear-to-t from-[#F9F7FA] via-[#F9F7FA] to-transparent px-6 py-6 text-center">
        <p className="max-w-md text-sm font-light italic text-[#1A1A1A]/50">
          Répondez avec votre première intuition. Il n'y a pas de mauvaise
          réponse, seulement votre vérité.
        </p>
      </footer>
    </div>
  )
}
