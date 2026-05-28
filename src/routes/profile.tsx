import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, MessageSquare, Search, User, Settings } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { DimensionBar } from '@/components/profile/DimensionBar'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function generateMockScores(type: string) {
  if (!type || type.length !== 4) {
    return {
      E: 50,
      I: 50,
      S: 50,
      N: 50,
      T: 50,
      F: 50,
      J: 50,
      P: 50,
    }
  }

  const scores = {
    E: type[0] === 'E' ? 72 : 28,
    I: type[0] === 'I' ? 72 : 28,
    S: type[1] === 'S' ? 64 : 36,
    N: type[1] === 'N' ? 64 : 36,
    T: type[2] === 'T' ? 81 : 19,
    F: type[2] === 'F' ? 81 : 19,
    J: type[3] === 'J' ? 58 : 42,
    P: type[3] === 'P' ? 58 : 42,
  }

  return scores
}

function ProfilePage() {
  const profile = useUserStore((state) => state.profile)

  if (!profile) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#1D1B4B]">
          Profil introuvable
        </h1>
        <p className="mb-8 text-[#1A1A1A]/70">
          Passe le test pour découvrir tes résultats.
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

  const scores = generateMockScores(profile.type)

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center justify-between px-6 pt-8">
        <h1 className="text-2xl font-bold text-[#1D1B4B]">Mon Profil</h1>
        <Button variant="ghost" size="icon" className="text-[#1A1A1A]/60">
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28">
        <div className="mt-6 flex flex-col items-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#b6e3f4] shadow-md">
            <img
              src="./avatar-coach.png"
              alt="Avatar Utilisateur"
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
            Cartographie Cognitive
          </h3>
          <div className="flex flex-col gap-6">
            <DimensionBar
              leftLabel="Extraverti"
              rightLabel="Introverti"
              leftValue={scores.E}
              rightValue={scores.I}
              colorClass="bg-blue-400"
            />
            <DimensionBar
              leftLabel="Sensation"
              rightLabel="Intuition"
              leftValue={scores.S}
              rightValue={scores.N}
              colorClass="bg-emerald-400"
            />
            <DimensionBar
              leftLabel="Pensée"
              rightLabel="Sentiment"
              leftValue={scores.T}
              rightValue={scores.F}
              colorClass="bg-purple-400"
            />
            <DimensionBar
              leftLabel="Jugement"
              rightLabel="Perception"
              leftValue={scores.J}
              rightValue={scores.P}
              colorClass="bg-orange-400"
            />
          </div>
        </Card>

        <Card className="mt-6 border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <h3 className="mb-3 text-lg font-bold text-[#1D1B4B]">Analyse IA</h3>
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
