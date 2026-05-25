import { createFileRoute, Link } from '@tanstack/react-router'
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
} from 'lucide-react'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const profile = useUserStore((state) => state.profile)

  if (!profile) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold">Oups, profil introuvable !</h1>
        <p className="mb-8 text-muted-foreground">
          Tu dois passer le test psychologique pour configurer ton coach IA.
        </p>
        <Button
          asChild
          className="rounded-full bg-[#1D1B4B] px-8 py-6 text-white hover:bg-[#1D1B4B]/90"
        >
          <Link to="/test">Passer le test</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-muted-foreground">
            SoulGuided
          </span>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <img src="https://github.com/shadcn.png" alt="Profile" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Bonjour, {profile.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Votre coach MBTI est prêt à vous guider.
          </p>
        </div>

        <div className="relative mt-8 flex flex-col items-center">
          <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-white shadow-inner">
            <img
              src="./avatar-coach.png"
              alt="Avatar Coach"
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            asChild
            className="absolute -bottom-4 flex gap-2 rounded-full bg-[#1D1B4B] px-8 py-6 text-white hover:bg-[#1D1B4B]/90"
          >
            <Link to="/chat">
              <MessageSquare className="h-5 w-5" />
              Discuter avec ma personnalité
            </Link>
          </Button>
        </div>

        <Card className="mt-12 border-none bg-[#FEF9C3]/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#FEF9C3] px-3 py-1 text-xs font-bold text-[#854D0E]">
              {profile.type} INSIGHT
            </span>
            <PenLine className="h-4 w-4 text-[#854D0E]" />
          </div>
          <h3 className="mt-4 font-semibold text-[#854D0E]">
            Croissance personnelle
          </h3>
          <p className="mt-2 italic text-[#854D0E]/80">"{profile.insight}"</p>
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
              className="flex flex-col items-center justify-center gap-3 border-none p-6 shadow-sm"
            >
              <div className={`rounded-2xl p-3 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}
              </span>
            </Card>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center gap-1 text-primary">
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px]">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Search className="h-6 w-6" />
          <span className="text-[10px]">Discover</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="h-6 w-6" />
          <span className="text-[10px]">Profile</span>
        </div>
      </nav>
    </div>
  )
}
