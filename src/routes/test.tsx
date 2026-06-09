import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { QuestionCard } from '@/components/profile/QuestionCard'
import { questions as quizQuestions } from '../data/questions'

export const Route = createFileRoute('/test')({
  component: TestPage,
  head: () => ({
    meta: [{ title: 'SoulType | Discover Your Essence' }],
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

      const rawScores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }

      Object.entries(newAnswers).forEach(([idStr, answer]) => {
        const id = parseInt(idStr)
        const isAgree = answer === 'Agree'

        if (id <= 4) isAgree ? rawScores.E++ : rawScores.I++
        else if (id <= 8) isAgree ? rawScores.N++ : rawScores.S++
        else if (id <= 12) isAgree ? rawScores.F++ : rawScores.T++
        else if (id <= 16) isAgree ? rawScores.J++ : rawScores.P++
      })

      const finalScores = {
        E: (rawScores.E / 4) * 100,
        I: (rawScores.I / 4) * 100,
        N: (rawScores.N / 4) * 100,
        S: (rawScores.S / 4) * 100,
        T: (rawScores.T / 4) * 100,
        F: (rawScores.F / 4) * 100,
        J: (rawScores.J / 4) * 100,
        P: (rawScores.P / 4) * 100,
      }

      const computedType = `${rawScores.E >= rawScores.I ? 'E' : 'I'}${rawScores.N >= rawScores.S ? 'N' : 'S'}${rawScores.T >= rawScores.F ? 'T' : 'F'}${rawScores.J >= rawScores.P ? 'J' : 'P'}`

      setProfile({
        name: 'Explorer',
        type: computedType,
        insight: `Your ${computedType} profile is taking shape. Your coach will refine this analysis over time.`,
        avatarSeed: computedType,
        scores: finalScores,
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      navigate({ to: '/register' })
    }
  }

  if (isFinished) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#001809] p-6 text-[#c9ebd0] md:p-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#e9c349] opacity-10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#e9c349]" />
          <div>
            <h1 className="mb-3 font-serif text-4xl font-normal text-[#e9c349]">
              Analyzing your essence...
            </h1>
            <p className="text-[#c8c5d0] text-lg">
              We are configuring your Soul Coach based on your answers.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="relative flex min-h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans overflow-hidden">
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-[#c5c0fe] opacity-5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute w-[600px] h-[600px] -bottom-40 -right-40 rounded-full bg-[#e9c349] opacity-5 blur-[100px] pointer-events-none z-0" />

      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 w-full bg-white/5">
        <div
          className="h-full bg-[#e9c349] shadow-[0_0_10px_#e9c349] transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <header className="relative z-10 flex shrink-0 flex-row items-center justify-between px-6 pt-8 pb-6">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 rounded-full py-2 text-sm font-bold text-[#c9ebd0] transition-colors hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>
        <p className="text-[10px] font-bold tracking-[0.2em] text-[#e9c349] uppercase">
          {currentIndex + 1} / {questions.length}
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 pb-12">
          <div className="flex min-h-[160px] w-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#e9c349] uppercase">
              Dimension {currentQuestion.dimension}
            </p>
            <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight text-[#c9ebd0] sm:text-4xl md:text-5xl">
              {currentQuestion.question}
            </h2>
          </div>

          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-4 bg-linear-to-t from-[#001809] via-[#001809] to-transparent px-6 py-8 text-center pointer-events-none">
        <p className="max-w-md text-sm font-light italic text-[#c8c5d0]/60">
          Answer with your first intuition. There are no right or wrong answers,
          only your truth.
        </p>
      </footer>
    </div>
  )
}
