import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Home,
  MessageSquare,
  Search,
  User,
  Settings,
  Loader2,
} from 'lucide-react'
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
      <div className="flex h-screen items-center justify-center bg-[#F9F7FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1D1B4B]" />
      </div>
    )
  }

  const profile = data?.user as ExtendedUser | undefined

  if (!profile || !profile.type) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#1D1B4B]">
          Profile not found
        </h1>
        <p className="mb-8 text-[#1A1A1A]/70">
          Take the test to discover your results.
        </p>
        <Button
          asChild
          className="rounded-full bg-[#1D1B4B] px-8 py-6 text-white hover:bg-[#1D1B4B]/90"
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
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center justify-between px-6 pt-8">
        <h1 className="text-2xl font-bold text-[#1D1B4B]">My Profile</h1>
        <Button variant="ghost" size="icon" className="text-[#1A1A1A]/60">
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28">
        <div className="mt-6 flex flex-col items-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#b6e3f4] shadow-md">
            <img
              src="./avatar-coach.png"
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-4 text-3xl font-black text-[#1D1B4B]">
            {profile.type}
          </h2>
          <span className="mt-1 rounded-full bg-[#1D1B4B]/5 px-4 py-1 text-sm font-semibold text-[#1D1B4B]">
            {profile.name}
          </span>
        </div>

        <Card className="mt-8 border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <h3 className="mb-6 text-lg font-bold text-[#1D1B4B]">
            Cognitive Mapping
          </h3>
          <div className="flex flex-col gap-6">
            <DimensionBar
              leftLabel="Extraverted"
              rightLabel="Introverted"
              leftValue={scores.E}
              rightValue={scores.I}
              colorClass="bg-blue-400"
            />
            <DimensionBar
              leftLabel="Sensing"
              rightLabel="Intuition"
              leftValue={scores.S}
              rightValue={scores.N}
              colorClass="bg-emerald-400"
            />
            <DimensionBar
              leftLabel="Thinking"
              rightLabel="Feeling"
              leftValue={scores.T}
              rightValue={scores.F}
              colorClass="bg-purple-400"
            />
            <DimensionBar
              leftLabel="Judging"
              rightLabel="Perceiving"
              leftValue={scores.J}
              rightValue={scores.P}
              colorClass="bg-orange-400"
            />
          </div>
        </Card>

        <Card className="mt-6 border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <h3 className="mb-3 text-lg font-bold text-[#1D1B4B]">AI Analysis</h3>
          <p className="text-sm leading-relaxed text-[#1A1A1A]/70">
            {profile.insight}
          </p>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <Link
          to="/dashboard"
          className="flex flex-col items-center gap-1 text-[#1A1A1A]/40 hover:text-[#1D1B4B] transition-colors"
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          to="/chat"
          className="flex flex-col items-center gap-1 text-[#1A1A1A]/40 hover:text-[#1D1B4B] transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-medium">Chat</span>
        </Link>
        <div className="flex flex-col items-center gap-1 text-[#1A1A1A]/40 hover:text-[#1D1B4B] transition-colors cursor-not-allowed">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-medium">Discover</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#1D1B4B]">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </nav>
    </div>
  )
}
