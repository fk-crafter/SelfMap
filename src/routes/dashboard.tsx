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
  PenLine,
  Activity,
  Sparkles,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { OnboardingReveal } from '@/components/dashboard/OnboardingReveal'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { toast } from 'sonner'

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

function DashboardBottomNav() {
  return (
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
  )
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
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#032110] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
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
          </div>
        </div>
      )}

      {onboardingStep === 'gender' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001809]/90 backdrop-blur-md px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#032110] p-8 shadow-2xl relative overflow-hidden">
            <h2 className="mb-4 font-serif text-2xl font-normal text-[#e9c349]">
              Initialize Coach
            </h2>
            <div className="mb-8 flex gap-3">
              {['male', 'female', 'other'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g as any)}
                  className={`flex-1 rounded-2xl border py-4 text-sm font-medium transition-all ${
                    gender === g
                      ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                      : 'border-white/10 bg-white/5 text-[#c8c5d0] hover:bg-white/10'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
            <Button
              onClick={handleGenerateCoach}
              disabled={!gender || isGenerating}
              className="w-full rounded-full bg-[#e9c349] h-12 text-[#001809] font-bold text-sm tracking-wider hover:bg-[#e9c349]/90 transition-transform active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

      <main className="flex-1 overflow-y-auto px-6 pb-32 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349] mb-1">
              Inner Sanctuary
            </h2>
            <h1 className="font-serif text-3xl font-normal text-[#c9ebd0]">
              Morning, {user.name}
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-1.5 text-xs font-bold tracking-widest text-[#e9c349]">
              {user.type}
            </span>
          </div>
        </div>

        <Card className="relative overflow-hidden border border-white/5 bg-linear-to-b from-[rgba(233,195,73,0.05)] to-transparent p-6 text-center backdrop-blur-xl mb-6 shadow-xl rounded-[2rem]">
          <div className="mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full border border-[#e9c349]/20 bg-[#c8c5d0]/5 shadow-[0_0_40px_rgba(233,195,73,0.15)] flex items-center justify-center">
            <img
              src={user.avatarSeed || './avatar-coach.png'}
              alt="Coach Avatar"
              className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-transform hover:scale-105 duration-500"
            />
          </div>

          <div className="mx-auto max-w-[85%] mb-6 inline-block rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#c8c5d0] shadow-lg backdrop-blur-md">
            "I noticed a shift in your patterns today. Shall we reflect on your
            recent decisions?"
          </div>

          <Button
            asChild
            className="w-full rounded-full bg-[#e9c349] h-14 text-[#001809] font-bold text-sm tracking-wider hover:bg-[#e9c349]/90 transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(233,195,73,0.2)]"
          >
            <Link to="/chat">
              START REFLECTION <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/journal">
            <Card className="group flex flex-col items-center justify-center p-5 border border-white/5 bg-[rgba(197,192,254,0.02)] hover:bg-[rgba(233,195,73,0.05)] transition-all duration-300 rounded-2xl cursor-pointer">
              <div className="mb-3 rounded-full bg-white/5 p-3 group-hover:bg-[#e9c349]/10 group-hover:text-[#e9c349] transition-colors">
                <PenLine className="h-6 w-6 text-[#c8c5d0] group-hover:text-[#e9c349]" />
              </div>
              <span className="text-xs font-bold text-[#c8c5d0] group-hover:text-[#e9c349]">
                Quick Journal
              </span>
            </Card>
          </Link>

          <Link to="/profile">
            <Card className="group flex flex-col items-center justify-center p-5 border border-white/5 bg-[rgba(197,192,254,0.02)] hover:bg-[rgba(233,195,73,0.05)] transition-all duration-300 rounded-2xl cursor-pointer">
              <div className="mb-3 rounded-full bg-white/5 p-3 group-hover:bg-[#e9c349]/10 group-hover:text-[#e9c349] transition-colors">
                <Activity className="h-6 w-6 text-[#c8c5d0] group-hover:text-[#e9c349]" />
              </div>
              <span className="text-xs font-bold text-[#c8c5d0] group-hover:text-[#e9c349]">
                Soul Map
              </span>
            </Card>
          </Link>
        </div>

        <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-5 shadow-lg rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#e9c349]" />
            <h3 className="font-serif text-lg text-[#c9ebd0]">Daily Insight</h3>
          </div>
          <p className="text-sm text-[#c8c5d0]/70 italic line-clamp-2 mb-4 leading-relaxed">
            "
            {user.insight ||
              'Efficiency is highly overrated if it bypasses the intuitive soul. Allow your mind to breathe.'}
            "
          </p>
          <Link
            to="/profile"
            className="text-xs font-bold tracking-wider text-[#e9c349] hover:opacity-80 transition-opacity"
          >
            READ FULL ANALYSIS →
          </Link>
        </Card>
      </main>

      <DashboardBottomNav />
    </div>
  )
}
