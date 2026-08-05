import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  MessageSquare,
  Home,
  Search,
  User,
  Loader2,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  PenLine,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { OnboardingReveal } from '@/components/dashboard/OnboardingReveal'
import { toast } from 'sonner'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

type ExtendedUser = {
  id: string
  name: string
  type?: string | null
  insight?: string | null
  avatarSeed?: string | null
  scores?: string | null
}

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState('----')

  useEffect(() => {
    if (!text) return

    let iterations = 0
    let interval: NodeJS.Timeout

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((_, index) => {
              if (index < Math.floor(iterations)) {
                return text[index]
              }
              return String.fromCharCode(65 + Math.floor(Math.random() * 26))
            })
            .join(''),
        )

        if (iterations >= text.length) {
          clearInterval(interval)
          setDisplay(text)
        }

        iterations += 0.15
      }, 50)
    }, 800)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text])

  return (
    <span className="font-mono font-bold tracking-widest text-[#e9c349]">
      {display}
    </span>
  )
}

function DashboardPage() {
  const navigate = useNavigate()
  const { data, isPending, refetch } = authClient.useSession()

  const [onboardingStep, setOnboardingStep] = useState<
    'none' | 'analysis' | 'gender'
  >('none')
  const [showReveal, setShowReveal] = useState(false)
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const user = data?.user as ExtendedUser | undefined

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  useEffect(() => {
    if (!user) return

    const hasSeenOnboarding = localStorage.getItem(`onboarding_${user.id}`)

    if (!hasSeenOnboarding) {
      if (user.type && !user.avatarSeed) {
        const timer = setTimeout(() => {
          setOnboardingStep('analysis')
        }, 1500)
        return () => clearTimeout(timer)
      } else if (user.avatarSeed) {
        setShowReveal(true)
      }
    }
  }, [user])

  useEffect(() => {
    if (onboardingStep === 'analysis') {
      const timer = setTimeout(() => {
        setOnboardingStep('gender')
      }, 5500)
      return () => clearTimeout(timer)
    }
  }, [onboardingStep])

  const handleCompleteOnboarding = () => {
    if (user) {
      localStorage.setItem(`onboarding_${user.id}`, 'true')
    }
    setShowReveal(false)
  }

  const handleGenerateCoach = async () => {
    if (!gender || !user || !user.type) return

    setIsGenerating(true)

    try {
      const res = await fetch('http://localhost:3000/user/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          mbtiType: user.type,
          gender: gender,
        }),
      })

      if (!res.ok) throw new Error('Erreur backend')

      await refetch()
      setOnboardingStep('none')
      setShowReveal(true)
    } catch (err) {
      toast.error('La génération a échoué. Veuillez réessayer.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  if (!user) return null

  if (!user.type) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#001809] p-6 text-center text-[#c9ebd0]">
        <h1 className="mb-4 font-serif text-3xl font-normal text-[#e9c349]">
          Profile incomplete
        </h1>
        <p className="mb-8 text-[#c8c5d0]/70">
          You need to take the psychological test to configure your Soul Coach.
        </p>
        <Button
          asChild
          className="rounded-full bg-[#e9c349] px-8 py-6 font-bold text-[#001809] hover:bg-[#e9c349]/90"
        >
          <Link to="/test">Take the test</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-x-hidden">
      {onboardingStep === 'analysis' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001809]/95 backdrop-blur-xl px-4">
          <div className="w-full max-w-112.5 rounded-[2rem] border border-white/10 bg-[#032110] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute w-50 h-50 -top-10 -right-10 rounded-full bg-[#e9c349] opacity-10 blur-[50px] pointer-events-none" />

            <h3 className="mb-8 text-xs font-bold uppercase tracking-widest text-[#c8c5d0]">
              Psychological Architecture
            </h3>

            <p className="text-sm leading-relaxed text-[#c8c5d0]/90 mb-8">
              Initial cognitive mapping suggests a dominant <br />
              <span className="text-4xl mt-6 mb-6 block">
                <ScrambleText text={user.type} />
              </span>
              structure.
            </p>

            <div className="h-px w-12 bg-[#e9c349]/50 mb-8" />

            <p className="text-xs leading-relaxed text-[#c8c5d0]/60 italic">
              Human depth cannot be contained within a 20-question baseline.
              Through ongoing dialogue, your Soul Coach will continuously adapt
              your profile to uncover your true nature.
            </p>
          </div>
        </div>
      )}

      {onboardingStep === 'gender' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001809]/90 backdrop-blur-md px-4">
          <div className="w-full max-w-1OO rounded-[2rem] border border-white/10 bg-[#032110] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute w-50 h-50 -top-10 -right-10 rounded-full bg-[#e9c349] opacity-10 blur-[50px] pointer-events-none" />

            <h2 className="mb-4 font-serif text-2xl font-normal text-[#e9c349]">
              Initialize Coach
            </h2>
            <p className="mb-8 text-sm text-[#c8c5d0]/80 leading-relaxed">
              To generate a 3D avatar that matches your energy, please select
              the gender of your Soul Coach.
            </p>

            <div className="mb-8 flex gap-3">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 rounded-2xl border py-4 text-sm font-medium transition-all ${
                  gender === 'male'
                    ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                    : 'border-white/10 bg-white/5 text-[#c8c5d0] hover:bg-white/10'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 rounded-2xl border py-4 text-sm font-medium transition-all ${
                  gender === 'female'
                    ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                    : 'border-white/10 bg-white/5 text-[#c8c5d0] hover:bg-white/10'
                }`}
              >
                Female
              </button>
              <button
                onClick={() => setGender('other')}
                className={`flex-1 rounded-2xl border py-4 text-sm font-medium transition-all ${
                  gender === 'other'
                    ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                    : 'border-white/10 bg-white/5 text-[#c8c5d0] hover:bg-white/10'
                }`}
              >
                Neutral
              </button>
            </div>

            <Button
              onClick={handleGenerateCoach}
              disabled={!gender || isGenerating}
              className="w-full rounded-full bg-[#e9c349] h-12 text-[#001809] font-bold text-sm tracking-wider hover:bg-[#e9c349]/90 transition-transform active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Avatar...
                </>
              ) : (
                'CONTINUE'
              )}
            </Button>
          </div>
        </div>
      )}

      {showReveal && user.avatarSeed && (
        <OnboardingReveal
          avatarUrl={user.avatarSeed}
          onComplete={handleCompleteOnboarding}
        />
      )}

      <DashboardHeader user={user} />

      <main className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="mt-8 mb-8">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349] mb-2">
            Inner Sanctuary
          </h2>
          <h1 className="font-serif text-5xl font-normal leading-tight text-[#c9ebd0]">
            Good Morning,
            <br />
            {user.name}
          </h1>
          <div className="w-12 h-px bg-[#e9c349]/50 mt-6" />
        </div>

        <div className="space-y-6">
          <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5c0fe] shadow-[0_0_8px_#c5c0fe]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5c0fe]">
                Live Guidance
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#c9ebd0] mb-4 leading-snug">
              Your Soul Coach is ready to explore today's patterns.
            </h3>

            <p className="text-sm text-[#c8c5d0] leading-relaxed mb-6">
              We've noticed a shift in your cognitive functions. Shall we
              reflect on your recent decision-making process?
            </p>

            <Button
              asChild
              className="w-full sm:w-auto mb-6 rounded-full bg-[#e9c349] text-[#001809] font-bold text-xs tracking-wider hover:bg-[#e9c349]/90 transition-transform active:scale-95 h-12 px-6 flex items-center justify-center gap-2"
            >
              <Link to="/chat">
                CONTINUE REFLECTION <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <div className="w-full aspect-square max-w-60 mx-auto bg-[#c8c5d0]/10 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={user.avatarSeed || './avatar-coach.png'}
                alt="Coach Avatar"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              />
            </div>
          </Card>

          <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
            <div className="flex items-start justify-between mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9c349]/10 text-[#e9c349]">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#c8c5d0]">
                {user.type || 'MBTI'}
              </span>
            </div>

            <h3 className="font-serif text-xl text-[#c9ebd0] mb-3">
              Daily Insight
            </h3>
            <p className="text-sm text-[#c8c5d0] leading-relaxed italic mb-6">
              "
              {user.insight ||
                'Efficiency is highly overrated if it bypasses the intuitive soul. Today, allow your mind to breathe without an immediate roadmap.'}
              "
            </p>

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#e9c349] hover:text-[#e9c349]/80 transition-colors"
            >
              Read Full Analysis <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Card>
        </div>
      </main>

      <Link
        to="/journal"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#e9c349] text-[#001809] shadow-[0_4px_20px_rgba(233,195,73,0.3)] transition-transform hover:scale-105 active:scale-95"
      >
        <PenLine className="h-6 w-6" />
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-20 items-center justify-around border-t border-white/5 bg-[#001206]/90 px-4 pb-4 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
        <div className="flex flex-col items-center justify-center gap-1 text-[#e9c349]">
          <Home className="h-5 w-5" />
          <span className="text-xs font-bold">Home</span>
        </div>
        <Link
          to="/chat"
          className="flex flex-col items-center justify-center gap-1 text-[#c8c5d0]/50 transition-colors hover:text-[#e9c349]"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-medium">Chat</span>
        </Link>
        <Link
          to="/discover"
          className="flex flex-col items-center justify-center gap-1 text-[#c8c5d0]/50 transition-colors hover:text-[#e9c349]"
        >
          <Search className="h-5 w-5" />
          <span className="text-xs font-medium">Discover</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center gap-1 text-[#c8c5d0]/50 transition-colors hover:text-[#e9c349]"
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
