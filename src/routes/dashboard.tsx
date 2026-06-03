import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  MessageSquare,
  LayoutGrid,
  PenLine,
  Wind,
  Users,
  Home,
  Search,
  User,
  Loader2,
  LogOut,
  Settings,
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
      <div className="flex h-screen items-center justify-center bg-[#F9F7FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1D1B4B]" />
      </div>
    )
  }

  const user = data?.user as ExtendedUser | undefined

  if (!user) return null

  if (!user.type) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#1D1B4B]">
          Oops, profile not found!
        </h1>
        <p className="mb-8 text-[#1A1A1A]/70">
          You need to take the psychological test to configure your AI coach.
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

  return (
    <div className="flex h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1B4B]/5">
            <Wind className="h-5 w-5 text-[#1D1B4B]" />
          </div>
          <span className="font-semibold text-[#1D1B4B]/60">SoulGuided</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer"
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
              <div className="absolute right-0 top-12 z-50 flex w-48 flex-col overflow-hidden rounded-2xl bg-white shadow-xl border border-[#1D1B4B]/5">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F7FA] transition-colors"
                >
                  <User className="h-4 w-4 text-[#1D1B4B]/60" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F7FA] transition-colors"
                >
                  <Settings className="h-4 w-4 text-[#1D1B4B]/60" />
                  Settings
                </Link>
                <div className="h-px w-full bg-[#1D1B4B]/5" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1D1B4B]">
            Hello, {user.name}
          </h1>
          <p className="mt-2 text-[#1A1A1A]/70">
            Your MBTI coach is ready to guide you.
          </p>
        </div>

        <div className="relative mt-8 flex flex-col items-center">
          <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-[#b6e3f4] shadow-inner">
            <img
              src="./avatar-coach.png"
              alt="Coach Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            asChild
            className="absolute -bottom-4 flex gap-2 rounded-full bg-[#1D1B4B] px-8 py-6 text-white hover:bg-[#1D1B4B]/90 transition-transform active:scale-95"
          >
            <Link to="/chat">
              <MessageSquare className="h-5 w-5" />
              Chat with my personality
            </Link>
          </Button>
        </div>

        <Card className="mt-12 border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#1D1B4B]/5 px-3 py-1 text-xs font-bold text-[#1D1B4B]">
              {user.type} INSIGHT
            </span>
            <PenLine className="h-4 w-4 text-[#1D1B4B]/40" />
          </div>
          <h3 className="mt-4 font-semibold text-[#1D1B4B]">Personal Growth</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70 italic">
            "{user.insight}"
          </p>
        </Card>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            {
              label: 'My MBTI',
              icon: LayoutGrid,
              color: 'bg-blue-50 text-blue-600',
            },
            {
              label: 'Journal',
              icon: PenLine,
              color: 'bg-green-50 text-green-600',
            },
            {
              label: 'Meditation',
              icon: Wind,
              color: 'bg-orange-50 text-orange-600',
            },
            {
              label: 'Community',
              icon: Users,
              color: 'bg-purple-50 text-purple-600',
            },
          ].map((item) => (
            <Card
              key={item.label}
              className="flex flex-col items-center justify-center gap-3 border-none bg-white p-6 shadow-md shadow-[#1D1B4B]/5 rounded-3xl transition-transform active:scale-95"
            >
              <div className={`rounded-2xl p-3 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-[#1D1B4B]/70">
                {item.label}
              </span>
            </Card>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center gap-1 text-[#1D1B4B]">
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold">Home</span>
        </div>
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
        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 text-[#1A1A1A]/40 hover:text-[#1D1B4B] transition-colors"
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
