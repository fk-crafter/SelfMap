import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Search, Sparkles } from 'lucide-react'
import { DashboardBottomNav } from '@/components/layout/DashboardBottomNav'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
})

const PERSONALITIES = [
  {
    type: 'INTJ',
    name: 'The Architect',
    nameFr: "L'Architecte",
    category: 'Analysts',
    desc: 'Strategic & Imaginative',
    descFr: 'Stratège & Imaginatif',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'INTP',
    name: 'The Logician',
    nameFr: 'Le Logicien',
    category: 'Analysts',
    desc: 'Innovative Inventors',
    descFr: 'Inventeur Innovant',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'ENTJ',
    name: 'The Commander',
    nameFr: 'Le Commandant',
    category: 'Analysts',
    desc: 'Bold & Decisive',
    descFr: 'Audacieux & Décidé',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },
  {
    type: 'ENTP',
    name: 'The Debater',
    nameFr: "L'Innovateur",
    category: 'Analysts',
    desc: 'Smart & Curious',
    descFr: 'Curieux & Esprit Vif',
    badgeColor: 'text-[#e9c349]',
    borderHover: 'hover:border-[#e9c349]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]',
  },

  {
    type: 'INFJ',
    name: 'The Advocate',
    nameFr: "L'Avocat",
    category: 'Diplomats',
    desc: 'Quiet & Visionary',
    descFr: 'Idéaliste & Visionnaire',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'INFP',
    name: 'The Mediator',
    nameFr: 'Le Médiateur',
    category: 'Diplomats',
    desc: 'Poetic & Altruistic',
    descFr: 'Poétique & Altruiste',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'ENFJ',
    name: 'The Protagonist',
    nameFr: 'Le Protagoniste',
    category: 'Diplomats',
    desc: 'Charismatic & Inspiring',
    descFr: 'Charismatique & Inspirant',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },
  {
    type: 'ENFP',
    name: 'The Campaigner',
    nameFr: "L'Inspirateur",
    category: 'Diplomats',
    desc: 'Free Spirit & Creative',
    descFr: 'Esprit Libre & Créatif',
    badgeColor: 'text-[#c5c0fe]',
    borderHover: 'hover:border-[#c5c0fe]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(197,192,254,0.15)]',
  },

  {
    type: 'ISTJ',
    name: 'The Logistician',
    nameFr: 'Le Logisticien',
    category: 'Sentinels',
    desc: 'Practical & Fact-minded',
    descFr: 'Pragmatique & Rigoureux',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ISFJ',
    name: 'The Defender',
    nameFr: 'Le Défenseur',
    category: 'Sentinels',
    desc: 'Dedicated & Warm',
    descFr: 'Dévoué & Protecteur',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ESTJ',
    name: 'The Executive',
    nameFr: 'Le Directeur',
    category: 'Sentinels',
    desc: 'Excellent Managers',
    descFr: 'Gestionnaire Remarquable',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },
  {
    type: 'ESFJ',
    name: 'The Consul',
    nameFr: 'Le Consul',
    category: 'Sentinels',
    desc: 'Helpful & Social',
    descFr: 'Serviable & Attentionné',
    badgeColor: 'text-[#c9ebd0]',
    borderHover: 'hover:border-[#c9ebd0]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(201,235,208,0.15)]',
  },

  {
    type: 'ISTP',
    name: 'The Virtuoso',
    nameFr: 'Le Virtuose',
    category: 'Explorers',
    desc: 'Bold & Practical',
    descFr: 'Pratique & Audacieux',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ISFP',
    name: 'The Adventurer',
    nameFr: "L'Aventurier",
    category: 'Explorers',
    desc: 'Flexible & Charming',
    descFr: 'Flexible & Chaleureux',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ESTP',
    name: 'The Entrepreneur',
    nameFr: "L'Entrepreneur",
    category: 'Explorers',
    desc: 'Smart & Energetic',
    descFr: 'Énergique & Réactif',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
  {
    type: 'ESFP',
    name: 'The Performer',
    nameFr: "L'Amuseur",
    category: 'Explorers',
    desc: 'Enthusiastic & Spontaneous',
    descFr: 'Enthousiaste & Spontané',
    badgeColor: 'text-[#ffb4ab]',
    borderHover: 'hover:border-[#ffb4ab]/40',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,180,171,0.15)]',
  },
]

const CATEGORIES = ['Analysts', 'Diplomats', 'Sentinels', 'Explorers']

function DiscoverPage() {
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const isFr = i18n.language.startsWith('fr')

  const filteredPersonalities = PERSONALITIES.filter((p) => {
    const query = search.toLowerCase()
    return (
      p.type.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      (p.nameFr && p.nameFr.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
    )
  })

  const get16PersonalitiesUrl = (type: string) => {
    return isFr
      ? `https://www.16personalities.com/fr/la-personnalite-${type.toLowerCase()}`
      : `https://www.16personalities.com/${type.toLowerCase()}-personality`
  }

  const getCategoryTitle = (cat: string) => {
    if (isFr) {
      if (cat === 'Analysts') return t('discover.analysts')
      if (cat === 'Diplomats') return t('discover.diplomats')
      if (cat === 'Sentinels') return t('discover.sentinels')
      if (cat === 'Explorers') return t('discover.explorers')
    }
    return cat
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
            <Sparkles className="h-3.5 w-3.5" /> {t('discover.badge')}
          </div>
          <h2 className="font-serif text-4xl font-normal text-[#c9ebd0] mb-3 tracking-tight">
            {t('discover.title')}
          </h2>
          <p className="text-sm md:text-base text-[#c8c5d0]/70 max-w-xl leading-relaxed">
            {t('discover.subtitle')}
          </p>

          <div className="relative mt-6 max-w-md mx-auto md:mx-0">
            <Input
              type="text"
              placeholder={t('discover.searchPlaceholder')}
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
                  {getCategoryTitle(cat)}
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
                          {isFr && item.nameFr ? item.nameFr : item.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#c8c5d0]/50 mt-4 font-medium leading-relaxed">
                        {isFr && item.descFr ? item.descFr : item.desc}
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
            {t('discover.noResults')}
          </div>
        )}
      </main>

      <DashboardBottomNav />
    </div>
  )
}
