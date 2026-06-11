import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  MessageSquare,
  Home,
  Search,
  User,
  Loader2,
  LogOut,
  Settings,
  Menu,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  PenLine,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

type ExtendedUser = {
  name: string
  type?: string | null
  insight?: string | null
  avatarSeed?: string | null
  scores?: string | null
}

function DashboardPage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/login' })
        },
      },
    })
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  const user = data?.user as ExtendedUser | undefined

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
      <header className="sticky top-0 z-30 flex items-center justify-between bg-[#001809]/80 px-6 py-5 backdrop-blur-xl border-b border-[#c9ebd0]/5">
        <div className="flex items-center gap-4">
          <button className="text-[#c9ebd0] hover:text-[#e9c349] transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-serif text-2xl font-normal tracking-tight text-[#e9c349]">
            SoulType
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block h-9 w-9 overflow-hidden rounded-full border border-[#e9c349]/20 shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer"
          >
            <img
              src="https://github.com/shadcn.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 top-12 z-50 flex w-48 flex-col overflow-hidden rounded-2xl bg-[#032110] shadow-2xl border border-white/10 backdrop-blur-xl">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] hover:bg-white/5 transition-colors"
                >
                  <User className="h-4 w-4 text-[#e9c349]/70" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] hover:bg-white/5 transition-colors"
                >
                  <Settings className="h-4 w-4 text-[#e9c349]/70" />
                  Settings
                </Link>
                <div className="h-px w-full bg-white/10" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#ffb4ab] hover:bg-white/5 transition-colors text-left w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </header>

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

            <div className="w-full aspect-square max-w-[240px] mx-auto bg-[#c8c5d0]/10 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="./avatar-coach.png"
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

      {/* Raccourci Journal Intime */}
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
