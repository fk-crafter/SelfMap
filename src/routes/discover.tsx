import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Home, MessageSquare, Search, User } from 'lucide-react'

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
})

const PERSONALITIES = [
  {
    type: 'INTJ',
    name: 'Architect',
    category: 'Analysts',
    desc: 'Imaginative and strategic thinkers, with a plan for everything.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    type: 'INTP',
    name: 'Logician',
    category: 'Analysts',
    desc: 'Innovative inventors with an unquenchable thirst for knowledge.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    type: 'ENTJ',
    name: 'Commander',
    category: 'Analysts',
    desc: 'Bold, imaginative and strong-willed leaders, always finding a way.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    type: 'ENTP',
    name: 'Debater',
    category: 'Analysts',
    desc: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    color: 'bg-purple-100 text-purple-700',
  },

  {
    type: 'INFJ',
    name: 'Advocate',
    category: 'Diplomats',
    desc: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    type: 'INFP',
    name: 'Mediator',
    category: 'Diplomats',
    desc: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    type: 'ENFJ',
    name: 'Protagonist',
    category: 'Diplomats',
    desc: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    type: 'ENFP',
    name: 'Campaigner',
    category: 'Diplomats',
    desc: 'Enthusiastic, creative and sociable free spirits.',
    color: 'bg-emerald-100 text-emerald-700',
  },

  {
    type: 'ISTJ',
    name: 'Logistician',
    category: 'Sentinels',
    desc: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    type: 'ISFJ',
    name: 'Defender',
    category: 'Sentinels',
    desc: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    type: 'ESTJ',
    name: 'Executive',
    category: 'Sentinels',
    desc: 'Excellent administrators, unsurpassed at managing things - or people.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    type: 'ESFJ',
    name: 'Consul',
    category: 'Sentinels',
    desc: 'Extraordinarily caring, social and popular people, always eager to help.',
    color: 'bg-blue-100 text-blue-700',
  },

  {
    type: 'ISTP',
    name: 'Virtuoso',
    category: 'Explorers',
    desc: 'Bold and practical experimenters, masters of all kinds of tools.',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    type: 'ISFP',
    name: 'Adventurer',
    category: 'Explorers',
    desc: 'Flexible and charming artists, always ready to explore and experience something new.',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    type: 'ESTP',
    name: 'Entrepreneur',
    category: 'Explorers',
    desc: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    type: 'ESFP',
    name: 'Entertainer',
    category: 'Explorers',
    desc: 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',
    color: 'bg-orange-100 text-orange-700',
  },
]

function DiscoverPage() {
  const [search, setSearch] = useState('')

  const filteredPersonalities = PERSONALITIES.filter(
    (p) =>
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="px-6 pt-10 pb-4 sticky top-0 bg-[#F9F7FA] z-10">
        <h1 className="text-3xl font-black text-[#1D1B4B]">Discover</h1>
        <p className="text-sm font-medium text-[#1A1A1A]/60 mt-1 mb-6">
          Explore the 16 personality types.
        </p>

        <div className="relative">
          <Input
            type="text"
            placeholder="Search by type, name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-2xl border-transparent bg-white pl-12 pr-4 text-sm text-[#1A1A1A] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1D1B4B]/20"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A1A1A]/30" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28 pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredPersonalities.map((item) => (
            <Card
              key={item.type}
              className="group border-none bg-white p-5 shadow-sm shadow-[#1D1B4B]/5 rounded-3xl transition-all hover:shadow-md active:scale-95 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${item.color}`}
                >
                  {item.category}
                </span>
                <span className="text-lg font-black text-[#1D1B4B] tracking-tight">
                  {item.type}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1D1B4B] mb-1">
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed text-[#1A1A1A]/70">
                {item.desc}
              </p>
            </Card>
          ))}
          {filteredPersonalities.length === 0 && (
            <div className="col-span-full py-10 text-center text-[#1A1A1A]/50">
              No personality found for "{search}".
            </div>
          )}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-20">
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
        <div className="flex flex-col items-center gap-1 text-[#1D1B4B]">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-bold">Discover</span>
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
