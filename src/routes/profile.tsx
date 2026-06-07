import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, MessageSquare, Search, User, Loader2 } from 'lucide-react'
import { DimensionBar } from '@/components/profile/DimensionBar'
import { authClient } from '@/lib/auth-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type ExtendedUser = {
  name: string
  type?: string | null
  insight?: string | null
  avatarSeed?: string | null
  scores?: string | null
}

function ProfilePage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  const profile = data?.user as ExtendedUser | undefined

  if (!profile || !profile.type) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#001809] p-6 text-center text-[#c9ebd0]">
        <h1 className="mb-4 font-serif text-3xl font-normal text-[#e9c349]">
          Profile incomplete
        </h1>
        <p className="mb-8 text-[#c8c5d0]/70">
          Take the test to discover your results.
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

  let scores = { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 }
  if (profile.scores) {
    try {
      scores = JSON.parse(profile.scores)
    } catch (e) {
      console.error('Error parsing scores')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-x-hidden">
      <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full bg-[#c5c0fe] opacity-10 blur-[80px] pointer-events-none z-0" />

      <header className="sticky top-0 z-30 bg-[#001809]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-center px-6 py-5">
        <h1 className="font-serif text-2xl font-normal text-[#e9c349] tracking-tight">
          My Profile
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="mt-8 flex flex-col items-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] shadow-[0_0_30px_rgba(197,192,254,0.1)]">
            <img
              src="./avatar-coach.png"
              alt="User Avatar"
              className="h-full w-full object-cover opacity-90 mix-blend-luminosity"
            />
          </div>
          <h2 className="mt-6 font-serif text-4xl font-normal text-[#c9ebd0] tracking-tight">
            {profile.type}
          </h2>
          <span className="mt-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1 text-xs font-bold tracking-widest text-[#e9c349] uppercase">
            {profile.name}
          </span>
        </div>

        <Card className="mt-10 border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
          <h3 className="mb-6 font-serif text-xl text-[#c9ebd0]">
            Cognitive Mapping
          </h3>
          <div className="flex flex-col gap-6">
            <DimensionBar
              leftLabel="Extraverted"
              rightLabel="Introverted"
              leftValue={scores.E}
              rightValue={scores.I}
              colorClass="bg-[#e9c349] shadow-[0_0_10px_#e9c349]"
            />
            <DimensionBar
              leftLabel="Sensing"
              rightLabel="Intuition"
              leftValue={scores.S}
              rightValue={scores.N}
              colorClass="bg-[#c5c0fe] shadow-[0_0_10px_#c5c0fe]"
            />
            <DimensionBar
              leftLabel="Thinking"
              rightLabel="Feeling"
              leftValue={scores.T}
              rightValue={scores.F}
              colorClass="bg-[#c9ebd0] shadow-[0_0_10px_#c9ebd0]"
            />
            <DimensionBar
              leftLabel="Judging"
              rightLabel="Perceiving"
              leftValue={scores.J}
              rightValue={scores.P}
              colorClass="bg-[#ffb4ab] shadow-[0_0_10px_#ffb4ab]"
            />
          </div>
        </Card>

        <Card className="mt-6 border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
          <h3 className="mb-3 font-serif text-xl text-[#c9ebd0]">
            AI Analysis
          </h3>
          <p className="text-sm leading-relaxed text-[#c8c5d0] italic">
            "{profile.insight}"
          </p>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-20 items-center justify-around border-t border-white/5 bg-[#001206]/90 px-4 pb-4 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center gap-1 text-[#c8c5d0]/50 transition-colors hover:text-[#e9c349]"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>
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
        <div className="flex flex-col items-center justify-center gap-1 text-[#e9c349]">
          <User className="h-5 w-5" />
          <span className="text-xs font-bold">Profile</span>
        </div>
      </nav>
    </div>
  )
}
