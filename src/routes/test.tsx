import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Loader2, Sparkles, Compass, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useUserStore } from '@/store/userStore'
import { authClient } from '@/lib/auth-client'
import { QuestionCard } from '@/components/profile/QuestionCard'
import { DimensionBar } from '@/components/profile/DimensionBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getArchetypeInfo } from '@/lib/archetypes'
import { questions as quizQuestions } from '../data/questions'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/test')({
  component: TestPage,
  head: () => ({
    meta: [{ title: 'SoulType | Discover Your Essence' }],
  }),
  loader: async () => {
    return { questions: quizQuestions }
  },
})

type FinalScores = {
  E: number
  I: number
  N: number
  S: number
  T: number
  F: number
  J: number
  P: number
}

function TestPage() {
  const { t, i18n } = useTranslation()
  const { questions } = Route.useLoaderData()
  const navigate = useNavigate({ from: '/test' })
  const setProfile = useUserStore((state) => state.setProfile)
  const storedUser = useUserStore((state) => state.user)
  const { data: sessionData } = authClient.useSession()
  const isLoggedIn = Boolean(sessionData?.user || storedUser)
  const isFr = i18n.language.startsWith('fr')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [computedResult, setComputedResult] = useState<{
    type: string
    scores: FinalScores
  } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('preview') === '1') {
        setComputedResult({
          type: 'INTJ',
          scores: { E: 24, I: 76, N: 82, S: 18, T: 68, F: 32, J: 74, P: 26 },
        })
        setShowResult(true)
      }
    }
  }, [])

  const handleAnswer = async (score: number) => {
    const currentQuestion = questions[currentIndex]

    const newAnswers = {
      ...userAnswers,
      [currentQuestion.id]: score,
    }

    setUserAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsAnalyzing(true)

      const axisSums = { E: 0, N: 0, T: 0, J: 0 }
      const axisCounts = { E: 0, N: 0, T: 0, J: 0 }

      questions.forEach((q) => {
        if (q.dimension === 'A') return

        const answerScore = newAnswers[q.id] ?? 0
        const calculatedScore =
          q.direction === 'positive' ? answerScore : -answerScore

        axisSums[q.dimension] += calculatedScore
        axisCounts[q.dimension]++
      })

      const getPercentageForAxis = (sum: number, count: number) => {
        const maxPossibleScore = count * 2
        const rawPercentage =
          ((sum + maxPossibleScore) / (maxPossibleScore * 2)) * 100
        return Math.round(rawPercentage)
      }

      const pE = getPercentageForAxis(axisSums.E, axisCounts.E)
      const pN = getPercentageForAxis(axisSums.N, axisCounts.N)
      const pT = getPercentageForAxis(axisSums.T, axisCounts.T)
      const pJ = getPercentageForAxis(axisSums.J, axisCounts.J)

      const finalScores: FinalScores = {
        E: pE,
        I: 100 - pE,
        N: pN,
        S: 100 - pN,
        T: pT,
        F: 100 - pT,
        J: pJ,
        P: 100 - pJ,
      }

      const computedType = `${finalScores.E >= finalScores.I ? 'E' : 'I'}${finalScores.N >= finalScores.S ? 'N' : 'S'}${finalScores.T >= finalScores.F ? 'T' : 'F'}${finalScores.J >= finalScores.P ? 'J' : 'P'}`
      const archetype = getArchetypeInfo(computedType)
      const richInsight = isFr ? archetype.summaryFr : archetype.summaryEn

      const quizProfile = {
        name: 'Explorer',
        type: computedType,
        insight: richInsight,
        avatarSeed: '',
        scores: finalScores,
      }

      setProfile(quizProfile)
      setComputedResult({ type: computedType, scores: finalScores })

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('soultype_quiz_profile', JSON.stringify(quizProfile))
        } catch (e) {
          console.error('Failed to save quiz profile to localStorage:', e)
        }
      }

      if (isLoggedIn) {
        try {
          await authClient.updateUser({
            type: computedType,
            scores: JSON.stringify(finalScores),
            insight: richInsight,
          })
        } catch (e) {
          console.error('Failed to update user profile:', e)
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1600))
      setIsAnalyzing(false)
      setShowResult(true)
    }
  }

  if (isAnalyzing) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#001809] p-6 text-[#c9ebd0] md:p-10">
        <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(233,195,73,0.1)_0%,transparent_70%)]" />

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#e9c349]" />
          <div>
            <h1 className="mb-3 font-serif text-4xl font-normal text-[#e9c349]">
              {t('test.analyzing')}
            </h1>
            <p className="text-lg text-[#c8c5d0]">
              {t('test.analyzingDesc')}
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (showResult && computedResult) {
    const archetype = getArchetypeInfo(computedResult.type)
    const title = isFr ? archetype.titleFr : archetype.titleEn
    const summary = isFr ? archetype.summaryFr : archetype.summaryEn
    const encouragement = isFr
      ? archetype.encouragementFr
      : archetype.encouragementEn
    const strengths = isFr ? archetype.strengthsFr : archetype.strengthsEn
    const { scores } = computedResult

    return (
      <main
        style={{
          paddingTop: 'max(2rem, calc(env(safe-area-inset-top, 0px) + 1rem))',
        }}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#001809] px-5 pb-16 text-[#c9ebd0]"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,195,73,0.12)_0%,transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto flex w-full max-w-xl flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#e9c349]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{t('test.resultBadge')}</span>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-6xl font-normal tracking-tight text-[#e9c349] sm:text-7xl">
              {computedResult.type}
            </h1>
            <p className="mt-2 font-serif text-2xl text-[#c9ebd0] sm:text-3xl">
              {title}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {strengths.map((str, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-[#c9ebd0]"
                >
                  ✦ {str}
                </span>
              ))}
            </div>
          </div>

          <Card className="w-full rounded-[2rem] border border-white/10 bg-[rgba(197,192,254,0.03)] p-6 shadow-xl backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e9c349]">
              <Compass className="h-4 w-4" />
              <span>{t('test.resultSummaryTitle')}</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#c9ebd0]/90">
              {summary}
            </p>

            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#c8c5d0]/60">
                {t('test.resultDimensionsTitle')}
              </p>
              <div className="flex flex-col gap-4">
                <DimensionBar
                  leftLabel={t('profile.extraverted')}
                  rightLabel={t('profile.introverted')}
                  leftValue={scores.E}
                  rightValue={scores.I}
                  colorClass="bg-[#e9c349] shadow-[0_0_10px_#e9c349]"
                />
                <DimensionBar
                  leftLabel={t('profile.sensing')}
                  rightLabel={t('profile.intuition')}
                  leftValue={scores.S}
                  rightValue={scores.N}
                  colorClass="bg-[#c5c0fe] shadow-[0_0_10px_#c5c0fe]"
                />
                <DimensionBar
                  leftLabel={t('profile.thinking')}
                  rightLabel={t('profile.feeling')}
                  leftValue={scores.T}
                  rightValue={scores.F}
                  colorClass="bg-[#c9ebd0] shadow-[0_0_10px_#c9ebd0]"
                />
                <DimensionBar
                  leftLabel={t('profile.judging')}
                  rightLabel={t('profile.perceiving')}
                  leftValue={scores.J}
                  rightValue={scores.P}
                  colorClass="bg-[#ffb4ab] shadow-[0_0_10px_#ffb4ab]"
                />
              </div>
            </div>
          </Card>

          <Card className="w-full rounded-[2rem] border border-[#e9c349]/30 bg-linear-to-b from-[#e9c349]/10 to-[#032110]/80 p-6 shadow-[0_0_30px_rgba(233,195,73,0.08)]">
            <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e9c349]">
              <Sparkles className="h-4 w-4" />
              <span>{t('test.resultEncouragementTitle')}</span>
            </div>
            <p className="text-sm sm:text-base italic leading-relaxed text-[#c9ebd0]">
              « {encouragement} »
            </p>
          </Card>

          <div className="w-full pt-2 text-center">
            <Button
              type="button"
              onClick={() =>
                navigate({ to: isLoggedIn ? '/dashboard' : '/register' })
              }
              className="h-14 w-full rounded-full bg-[#e9c349] px-6 text-sm font-bold text-[#001809] shadow-[0_0_30px_rgba(233,195,73,0.35)] transition-all hover:bg-[#f6d773] active:scale-[0.98]"
            >
              <span>
                {isLoggedIn ? t('test.resultCtaLoggedIn') : t('test.resultCta')}
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-3 text-xs text-[#c8c5d0]/60">
              {t('test.resultSubtext')}
            </p>
          </div>
        </motion.div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(197,192,254,0.05)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 z-0 h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(233,195,73,0.05)_0%,transparent_70%)]" />

      <div className="fixed left-0 right-0 top-0 z-50 h-1.5 w-full bg-white/5">
        <div
          className="h-full bg-[#e9c349] shadow-[0_0_10px_#e9c349] transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <header
        style={{
          paddingTop:
            'max(2rem, calc(env(safe-area-inset-top, 0px) + 1rem))',
        }}
        className="relative z-10 flex shrink-0 flex-row items-center justify-between px-6 pb-6"
      >
        <Link
          to="/"
          className="flex flex-row items-center gap-2 rounded-full py-2 text-sm font-bold text-[#c9ebd0] transition-colors hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('test.back')}
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349]">
          {currentIndex + 1} / {questions.length}
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 pb-12">
          <div className="flex min-h-40 w-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349]">
              {t('test.dimension')} {currentQuestion.dimension}
            </p>
            <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight text-[#c9ebd0] sm:text-4xl md:text-5xl">
              {(i18n.language.startsWith('fr') && currentQuestion.questionFr)
                ? currentQuestion.questionFr
                : currentQuestion.question}
            </h2>
          </div>

          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </main>

      <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-4 bg-linear-to-t from-[#001809] via-[#001809] to-transparent px-6 py-8 text-center">
        <p className="max-w-md text-sm font-light italic text-[#c8c5d0]/60">
          {t('test.footerHint')}
        </p>
      </footer>
    </div>
  )
}
