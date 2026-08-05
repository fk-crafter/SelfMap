import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Search, Sparkles } from 'lucide-react'
import { DashboardBottomNav } from '@/components/layout/DashboardBottomNav'

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
})

const PERSONALITIES = [
  {
    type: 'INTJ',
    name: 'The Architect',
    category: 'Analysts',
    desc: 'Strategic & Imaginative',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'INTP',
    name: 'The Logician',
    category: 'Analysts',
    desc: 'Innovative Inventors',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'ENTJ',
    name: 'The Commander',
    category: 'Analysts',
    desc: 'Bold & Decisive',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'ENTP',
    name: 'The Debater',
    category: 'Analysts',
    desc: 'Smart & Curious',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },

  {
    type: 'INFJ',
    name: 'The Advocate',
    category: 'Diplomats',
    desc: 'Quiet & Visionary',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'INFP',
    name: 'The Mediator',
    category: 'Diplomats',
    desc: 'Poetic & Altruistic',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'ENFJ',
    name: 'The Protagonist',
    category: 'Diplomats',
    desc: 'Charismatic & Inspiring',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'ENFP',
    name: 'The Campaigner',
    category: 'Diplomats',
    desc: 'Free Spirit & Creative',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },

  {
    type: 'ISTJ',
    name: 'The Logistician',
    category: 'Sentinels',
    desc: 'Practical & Fact-minded',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ISFJ',
    name: 'The Defender',
    category: 'Sentinels',
    desc: 'Dedicated & Warm',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ESTJ',
    name: 'The Executive',
    category: 'Sentinels',
    desc: 'Excellent Managers',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ESFJ',
    name: 'The Consul',
    category: 'Sentinels',
    desc: 'Helpful & Social',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },

  {
    type: 'ISTP',
    name: 'The Virtuoso',
    category: 'Explorers',
    desc: 'Bold & Practical',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ISFP',
    name: 'The Adventurer',
    category: 'Explorers',
    desc: 'Flexible & Charming',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ESTP',
    name: 'The Entrepreneur',
    category: 'Explorers',
    desc: 'Smart & Energetic',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ESFP',
    name: 'The Performer',
    category: 'Explorers',
    desc: 'Enthusiastic & Spontaneous',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
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
      <div className="absolute w-125 h-125 -top-20 -left-20 rounded-full bg-[#e9c349] opacity-10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute w-150 h-150 bottom-0 -right-40 rounded-full bg-[#c5c0fe] opacity-10 blur-[100px] pointer-events-none z-0" />

      <header className="sticky top-0 z-30 bg-[#001809]/80 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-[#e9c349] tracking-tight font-normal">
          SoulType
        </h1>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e9c349]/20">
          <img
            alt="Profile avatar"
            className="w-full h-full object-cover"
            src="./avatar-coach.png"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 md:px-8 pt-10 pb-32 max-w-4xl mx-auto w-full z-10 relative">
        <section className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-[#e9c349] mb-4">
            <Sparkles className="h-3.5 w-3.5" /> ARCHETYPE REPOSITORY
          </div>
          <h2 className="font-serif text-4xl font-normal text-[#c9ebd0] mb-3 tracking-tight">
            Discover Your Essence
          </h2>
          <p className="text-sm md:text-base text-[#c8c5d0]/70 max-w-xl leading-relaxed">
            Traverse the landscape of personality. Each archetype holds a unique
            key to understanding the tapestry of human existence.
          </p>

          <div className="relative mt-6 max-w-md mx-auto md:mx-0">
            <Input
              type="text"
              placeholder="Search by archetype or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl pl-12 pr-4 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/30 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c9ebd0]/30" />
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const catItems = filteredPersonalities.filter(
            (p) => p.category === cat,
          )
          if (catItems.length === 0) return null

          return (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-serif text-lg tracking-wider uppercase text-[#e9c349]/80">
                  {cat}
                </h3>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {catItems.map((item) => (
                  <a
                    key={item.type}
                    href={get16PersonalitiesUrl(item.type)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card
                      className={`group h-full border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-5 rounded-[1.5rem] flex flex-col justify-between transition-all duration-300 hover:bg-[rgba(197,192,254,0.05)] ${item.borderHover} ${item.glow} hover:-translate-y-1 cursor-pointer`}
                    >
                      <div>
                        <span
                          className={`text-2xl font-serif font-bold tracking-tight block mb-2 ${item.badgeColor}`}
                        >
                          {item.type}
                        </span>
                        <h4 className="text-sm font-bold text-[#c9ebd0] tracking-tight">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#c8c5d0]/50 mt-4 font-medium leading-relaxed">
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

      <DashboardBottomNav />
    </div>
  )
}
