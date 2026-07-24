import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Home, MessageSquare, Search, User } from 'lucide-react'

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
})

const PERSONALITIES = [
  {
    type: 'INTJ',
    name: 'The Architect',
    category: 'Analysts',
    desc: 'Strategic & Imaginative',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    badgeColor: 'text-[#e9c349]',
    dotColor: 'bg-[#e9c349] shadow-[0_0_15px_#e9c349]',
  },
  {
    type: 'INTP',
    name: 'The Logician',
    category: 'Analysts',
    desc: 'Innovative Inventors',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&q=80',
    badgeColor: 'text-[#e9c349]',
    dotColor: 'bg-[#e9c349] shadow-[0_0_15px_#e9c349]',
  },
  {
    type: 'ENTJ',
    name: 'The Commander',
    category: 'Analysts',
    desc: 'Bold & Decisive',
    image:
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80',
    badgeColor: 'text-[#e9c349]',
    dotColor: 'bg-[#e9c349] shadow-[0_0_15px_#e9c349]',
  },
  {
    type: 'ENTP',
    name: 'The Debater',
    category: 'Analysts',
    desc: 'Smart & Curious',
    image:
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&q=80',
    badgeColor: 'text-[#e9c349]',
    dotColor: 'bg-[#e9c349] shadow-[0_0_15px_#e9c349]',
  },

  {
    type: 'INFJ',
    name: 'The Advocate',
    category: 'Diplomats',
    desc: 'Quiet & Visionary',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
    badgeColor: 'text-[#c5c0fe]',
    dotColor: 'bg-[#c5c0fe] shadow-[0_0_15px_#c5c0fe]',
  },
  {
    type: 'INFP',
    name: 'The Mediator',
    category: 'Diplomats',
    desc: 'Poetic & Altruistic',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80',
    badgeColor: 'text-[#c5c0fe]',
    dotColor: 'bg-[#c5c0fe] shadow-[0_0_15px_#c5c0fe]',
  },
  {
    type: 'ENFJ',
    name: 'The Protagonist',
    category: 'Diplomats',
    desc: 'Charismatic & Inspiring',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80',
    badgeColor: 'text-[#c5c0fe]',
    dotColor: 'bg-[#c5c0fe] shadow-[0_0_15px_#c5c0fe]',
  },
  {
    type: 'ENFP',
    name: 'The Campaigner',
    category: 'Diplomats',
    desc: 'Free Spirit & Creative',
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80',
    badgeColor: 'text-[#c5c0fe]',
    dotColor: 'bg-[#c5c0fe] shadow-[0_0_15px_#c5c0fe]',
  },

  {
    type: 'ISTJ',
    name: 'The Logistician',
    category: 'Sentinels',
    desc: 'Practical & Fact-minded',
    image:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80',
    badgeColor: 'text-[#c9ebd0]',
    dotColor: 'bg-[#c9ebd0] shadow-[0_0_15px_#c9ebd0]',
  },
  {
    type: 'ISFJ',
    name: 'The Defender',
    category: 'Sentinels',
    desc: 'Dedicated & Warm',
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80',
    badgeColor: 'text-[#c9ebd0]',
    dotColor: 'bg-[#c9ebd0] shadow-[0_0_15px_#c9ebd0]',
  },
  {
    type: 'ESTJ',
    name: 'The Executive',
    category: 'Sentinels',
    desc: 'Excellent Managers',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    badgeColor: 'text-[#c9ebd0]',
    dotColor: 'bg-[#c9ebd0] shadow-[0_0_15px_#c9ebd0]',
  },
  {
    type: 'ESFJ',
    name: 'The Consul',
    category: 'Sentinels',
    desc: 'Helpful & Social',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80',
    badgeColor: 'text-[#c9ebd0]',
    dotColor: 'bg-[#c9ebd0] shadow-[0_0_15px_#c9ebd0]',
  },

  {
    type: 'ISTP',
    name: 'The Virtuoso',
    category: 'Explorers',
    desc: 'Bold & Practical',
    image:
      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&q=80',
    badgeColor: 'text-[#ffb4ab]',
    dotColor: 'bg-[#ffb4ab] shadow-[0_0_15px_#ffb4ab]',
  },
  {
    type: 'ISFP',
    name: 'The Adventurer',
    category: 'Explorers',
    desc: 'Flexible & Charming',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80',
    badgeColor: 'text-[#ffb4ab]',
    dotColor: 'bg-[#ffb4ab] shadow-[0_0_15px_#ffb4ab]',
  },
  {
    type: 'ESTP',
    name: 'The Entrepreneur',
    category: 'Explorers',
    desc: 'Smart & Energetic',
    image:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80',
    badgeColor: 'text-[#ffb4ab]',
    dotColor: 'bg-[#ffb4ab] shadow-[0_0_15px_#ffb4ab]',
  },
  {
    type: 'ESFP',
    name: 'The Performer',
    category: 'Explorers',
    desc: 'Enthusiastic & Spontaneous',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80',
    badgeColor: 'text-[#ffb4ab]',
    dotColor: 'bg-[#ffb4ab] shadow-[0_0_15px_#ffb4ab]',
  },
]

const CATEGORIES = ['Analysts', 'Diplomats', 'Sentinels', 'Explorers']

function DiscoverPage() {
  const [search, setSearch] = useState('')

  const filteredPersonalities = PERSONALITIES.filter(
    (p) =>
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  )

  const get16PersonalitiesUrl = (type: string) => {
    return `https://www.16personalities.com/${type.toLowerCase()}-personality`
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-x-hidden select-none">
      <div className="absolute w-125 h-125 -top-20 -left-20 rounded-full bg-[#e9c349] opacity-15 blur-[80px] pointer-events-none z-0" />
      <div className="absolute w-150 h-150 bottom-0 -right-40 rounded-full bg-[#c5c0fe] opacity-15 blur-[80px] pointer-events-none z-0" />

      <header className="sticky top-0 z-30 bg-[#001809]/80 backdrop-blur-xl border-b border-[#c9ebd0]/10 px-8 py-5 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-[#e9c349] tracking-tight font-normal">
          SoulType
        </h1>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e9c349]/20">
          <img
            alt="Profile avatar"
            className="w-full h-full object-cover"
            src="https://github.com/shadcn.png"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pt-10 pb-32 max-w-300 mx-auto w-full z-10 relative">
        <section className="mb-14 text-center md:text-left">
          <h2 className="font-serif text-4xl font-normal text-[#c9ebd0] mb-4 tracking-tight leading-tight">
            Discover Your Essence
          </h2>
          <p className="text-base text-[#c8c5d0] max-w-xl font-normal leading-relaxed">
            Traverse the landscape of personality. Each archetype holds a unique
            key to understanding the tapestry of human existence.
          </p>

          <div className="relative mt-8 max-w-md mx-auto md:mx-0">
            <Input
              type="text"
              placeholder="Search profile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-[rgba(197,192,254,0.05)] backdrop-blur-xl pl-12 pr-4 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c9ebd0]/30" />
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const catItems = filteredPersonalities.filter(
            (p) => p.category === cat,
          )
          if (catItems.length === 0) return null

          const currentConfig = PERSONALITIES.find((p) => p.category === cat)

          return (
            <div key={cat} className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className={`w-2 h-2 rounded-full ${currentConfig?.dotColor}`}
                />
                <h3
                  className={`font-serif text-xl font-normal ${currentConfig?.badgeColor}`}
                >
                  {cat}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {catItems.map((item) => (
                  <a
                    key={item.type}
                    href={get16PersonalitiesUrl(item.type)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="group h-full border border-white/10 bg-[rgba(197,192,254,0.03)] backdrop-blur-xl p-3 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:bg-[rgba(197,192,254,0.08)] hover:border-[#e9c349]/20 hover:-translate-y-1 cursor-pointer">
                      <div className="w-full aspect-square rounded-xl mb-4 overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-110"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#e9c349] mb-1">
                        {item.type}
                      </span>
                      <h4 className="text-base font-bold text-[#c9ebd0] tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#c8c5d0]/60 mt-1 font-medium">
                        {item.desc}
                      </p>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )
        })}

        {filteredPersonalities.length === 0 && (
          <div className="py-20 text-center text-[#c8c5d0]/40 font-medium">
            No archetype matching your search.
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#001206]/90 backdrop-blur-2xl border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] flex justify-around items-center h-20 pb-4 px-4">
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center text-[#c8c5d0]/50 hover:text-[#e9c349] transition-colors gap-1"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          to="/chat"
          className="flex flex-col items-center justify-center text-[#c8c5d0]/50 hover:text-[#e9c349] transition-colors gap-1"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-medium">Chat</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-[#e9c349] gap-1">
          <Search className="h-5 w-5" />
          <span className="text-xs font-bold">Discover</span>
        </div>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center text-[#c8c5d0]/50 hover:text-[#e9c349] transition-colors gap-1"
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
