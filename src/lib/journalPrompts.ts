export type Temperament = 'analyst' | 'diplomat' | 'sentinel' | 'explorer' | 'universal'

export interface JournalPrompt {
  id: string
  temperament: Temperament
  text: {
    fr: string
    en: string
  }
}

export const TEMPERAMENTS_MAP: Record<string, Temperament> = {
  // Analysts (NT)
  INTJ: 'analyst',
  INTP: 'analyst',
  ENTJ: 'analyst',
  ENTP: 'analyst',

  // Diplomats (NF)
  INFJ: 'diplomat',
  INFP: 'diplomat',
  ENFJ: 'diplomat',
  ENFP: 'diplomat',

  // Sentinels (SJ)
  ISTJ: 'sentinel',
  ISFJ: 'sentinel',
  ESTJ: 'sentinel',
  ESFJ: 'sentinel',

  // Explorers (SP)
  ISTP: 'explorer',
  ISFP: 'explorer',
  ESTP: 'explorer',
  ESFP: 'explorer',
}

export function getTemperamentFromType(mbtiType?: string | null): Temperament {
  if (!mbtiType) return 'universal'
  const normalized = mbtiType.toUpperCase().trim()
  return TEMPERAMENTS_MAP[normalized] || 'universal'
}

export const JOURNAL_PROMPTS: JournalPrompt[] = [
  // --- ANALYSTES (NT) ---
  {
    id: 'nt-1',
    temperament: 'analyst',
    text: {
      fr: 'Quelle idée ou stratégie a le plus stimulé ton esprit aujourd’hui, et quel premier pas concret peux-tu poser ?',
      en: 'What idea or strategy most stimulated your mind today, and what is one concrete step you can take toward it?',
    },
  },
  {
    id: 'nt-2',
    temperament: 'analyst',
    text: {
      fr: 'Y a-t-il une émotion ou une tension que tu as rationalisée aujourd’hui au lieu de simplement la ressentir et l’accueillir ?',
      en: 'Is there an emotion or tension you rationalized today instead of simply feeling and acknowledging it?',
    },
  },
  {
    id: 'nt-3',
    temperament: 'analyst',
    text: {
      fr: 'Sur quelle situation as-tu peut-être trop intellectualisé, alors qu’elle demandait simplement du lâcher-prise ?',
      en: 'What situation might you have over-intellectualized today, when it simply called for letting go?',
    },
  },
  {
    id: 'nt-4',
    temperament: 'analyst',
    text: {
      fr: 'Quelle vérité ou contradiction as-tu remarquée récemment dans ton environnement ou dans tes propres actions ?',
      en: 'What subtle truth or contradiction did you notice recently in your surroundings or in your own actions?',
    },
  },
  {
    id: 'nt-5',
    temperament: 'analyst',
    text: {
      fr: 'Comment peux-tu équilibrer ton haut niveau d’exigence avec un peu de compassion envers toi-même ce soir ?',
      en: 'How can you balance your high standards with gentle self-compassion tonight?',
    },
  },

  // --- DIPLOMATES (NF) ---
  {
    id: 'nf-1',
    temperament: 'diplomat',
    text: {
      fr: 'Quelle interaction ou parole t’a le plus profondément touché(e) aujourd’hui, et quelle part de toi résonne avec ?',
      en: 'Which interaction or word resonated most deeply with you today, and what part of you does it speak to?',
    },
  },
  {
    id: 'nf-2',
    temperament: 'diplomat',
    text: {
      fr: 'As-tu respecté ton propre réservoir émotionnel aujourd’hui, ou as-tu porté les fardeaux de quelqu’un d’autre ?',
      en: 'Did you respect your own emotional reserve today, or did you absorb someone else’s burden?',
    },
  },
  {
    id: 'nf-3',
    temperament: 'diplomat',
    text: {
      fr: 'Quelle valeur ou idéal cher à ton cœur as-tu réussi à incarner aujourd’hui, même à travers un geste discret ?',
      en: 'What cherished value or ideal did you embody today, even through a small and quiet gesture?',
    },
  },
  {
    id: 'nf-4',
    temperament: 'diplomat',
    text: {
      fr: 'De quoi ton monde intérieur a-t-il besoin ce soir pour retrouver calme et clarté ?',
      en: 'What does your inner world need tonight to find stillness and emotional clarity?',
    },
  },
  {
    id: 'nf-5',
    temperament: 'diplomat',
    text: {
      fr: 'Quelle beauté subtile ou quelle étincelle d’espoir as-tu croisée au milieu de ta journée ?',
      en: 'What subtle beauty or spark of hope crossed your path during your day?',
    },
  },

  // --- SENTINELLES (SJ) ---
  {
    id: 'sj-1',
    temperament: 'sentinel',
    text: {
      fr: 'De quel engagement ou devoir accompli avec constance aujourd’hui tires-tu le plus de satisfaction ?',
      en: 'Which commitment or duty fulfilled with consistency today gives you the most satisfaction?',
    },
  },
  {
    id: 'sj-2',
    temperament: 'sentinel',
    text: {
      fr: 'Un imprévu ou un changement t’a-t-il déstabilisé(e) ? Comment peux-tu y faire face avec confiance ?',
      en: 'Did an unforeseen event unsettle you today? How can you approach it with calm and confidence?',
    },
  },
  {
    id: 'sj-3',
    temperament: 'sentinel',
    text: {
      fr: 'Après avoir veillé sur tes obligations et sur les autres, qu’as-tu fait pour ton propre repos aujourd’hui ?',
      en: 'After attending to your duties and those around you, what did you do for your own rest today?',
    },
  },
  {
    id: 'sj-4',
    temperament: 'sentinel',
    text: {
      fr: 'Quelle habitude ou quel rituel t’apporte le plus d’ancrage et de sécurité en ce moment ?',
      en: 'Which daily habit or ritual currently brings you the most grounding and security?',
    },
  },
  {
    id: 'sj-5',
    temperament: 'sentinel',
    text: {
      fr: 'Où peux-tu t’accorder le droit au relâchement et à l’imperfection ce soir ?',
      en: 'Where can you grant yourself permission to release control and accept imperfection tonight?',
    },
  },

  // --- EXPLORATEURS (SP) ---
  {
    id: 'sp-1',
    temperament: 'explorer',
    text: {
      fr: 'Quel moment précis de ta journée t’a fait te sentir pleinement ancré(e) dans le présent et vivant(e) ?',
      en: 'Which precise moment today made you feel truly present, alert, and alive?',
    },
  },
  {
    id: 'sp-2',
    temperament: 'explorer',
    text: {
      fr: 'Quelle sensation physique ou quel signal corporel as-tu remarqué aujourd’hui, et de quoi ton corps a-t-il envie ?',
      en: 'What bodily sensation or signal did you notice today, and what movement or rest does your body crave?',
    },
  },
  {
    id: 'sp-3',
    temperament: 'explorer',
    text: {
      fr: 'Quelle opportunité spontanée as-tu saisie aujourd’hui, ou quel défi aimerais-tu tenter demain ?',
      en: 'What spontaneous opportunity did you seize today, or what new challenge would you like to take on tomorrow?',
    },
  },
  {
    id: 'sp-4',
    temperament: 'explorer',
    text: {
      fr: 'As-tu fait confiance à ton instinct immédiat face à un choix, et qu’est-ce que cela t’a appris ?',
      en: 'Did you trust your immediate instinct in a decision today, and what did that experience teach you?',
    },
  },
  {
    id: 'sp-5',
    temperament: 'explorer',
    text: {
      fr: 'Si cette journée avait une saveur, une texture ou une bande-son, quelle serait-elle ?',
      en: 'If today had a texture, flavor, or soundtrack, what would it be?',
    },
  },

  // --- UNIVERSELS ---
  {
    id: 'uni-1',
    temperament: 'universal',
    text: {
      fr: 'Quel a été l’instant le plus marquant de ta journée, et qu’a-t-il réveillé en toi ?',
      en: 'What was the most meaningful moment of your day, and what did it evoke in you?',
    },
  },
  {
    id: 'uni-2',
    temperament: 'universal',
    text: {
      fr: 'Qu’as-tu découvert sur toi-même aujourd’hui que tu ignorais encore hier ?',
      en: 'What did you discover about yourself today that you did not realize yesterday?',
    },
  },
  {
    id: 'uni-3',
    temperament: 'universal',
    text: {
      fr: 'Quelle gratitude ou quel soulagement peux-tu déposer ici avant de clore cette journée ?',
      en: 'What gratitude or sense of relief can you lay down here before bringing this day to a close?',
    },
  },
]

export function getPromptsForTemperament(temperament: Temperament): JournalPrompt[] {
  const specific = JOURNAL_PROMPTS.filter((p) => p.temperament === temperament)
  const universal = JOURNAL_PROMPTS.filter((p) => p.temperament === 'universal')
  return specific.length > 0 ? [...specific, ...universal] : universal
}

export function getDailyPrompt(
  mbtiType?: string | null,
  offset = 0,
): JournalPrompt {
  const temperament = getTemperamentFromType(mbtiType)
  const pool = getPromptsForTemperament(temperament)

  // Seed based on current day of year
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - startOfYear.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))

  const index = Math.abs((dayOfYear + offset) % pool.length)
  return pool[index]
}
