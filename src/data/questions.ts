export interface ApiQuestion {
  id: number
  dimension: 'E' | 'N' | 'T' | 'J' | 'A'
  direction: 'positive' | 'negative'
  question: string
  questionFr?: string
}

export const questions: ApiQuestion[] = [
  {
    id: 1,
    dimension: 'E',
    direction: 'positive',
    question: 'You regularly make new friends.',
    questionFr: 'Vous vous faites régulièrement de nouveaux amis.',
  },
  {
    id: 2,
    dimension: 'E',
    direction: 'negative',
    question: 'You find the idea of networking highly intimidating.',
    questionFr: "L'idée de faire du réseautage vous intimide beaucoup.",
  },
  {
    id: 3,
    dimension: 'E',
    direction: 'positive',
    question: 'You enjoy participating in team-based activities.',
    questionFr: 'Vous aimez participer à des activités en équipe.',
  },
  {
    id: 4,
    dimension: 'E',
    direction: 'negative',
    question: 'You prefer solitary hobbies or activities over group ones.',
    questionFr: 'Vous préférez les loisirs solitaires plutôt qu en groupe.',
  },

  {
    id: 5,
    dimension: 'N',
    direction: 'positive',
    question:
      'Complex and innovative ideas excite you more than simple and straightforward ones.',
    questionFr:
      'Les idées complexes et innovantes vous stimulent plus que les idées simples et directes.',
  },
  {
    id: 6,
    dimension: 'N',
    direction: 'negative',
    question:
      'You do not particularly enjoy discussions about various interpretations of creative works.',
    questionFr:
      "Vous n'appréciez pas particulièrement les débats sur les diverses interprétations d'œuvres créatives.",
  },
  {
    id: 7,
    dimension: 'N',
    direction: 'positive',
    question: 'You like experimenting with new and untested approaches.',
    questionFr: 'Vous aimez expérimenter de nouvelles approches encore non testées.',
  },
  {
    id: 8,
    dimension: 'N',
    direction: 'positive',
    question:
      'You are constantly looking for new fields of knowledge to explore.',
    questionFr:
      'Vous êtes constamment à la recherche de nouveaux domaines de connaissances à explorer.',
  },

  {
    id: 9,
    dimension: 'T',
    direction: 'negative',
    question:
      'You are more easily swayed by emotional appeals than by factual arguments.',
    questionFr:
      'Vous êtes plus facilement influencé par les appels aux émotions que par les arguments factuels.',
  },
  {
    id: 10,
    dimension: 'T',
    direction: 'negative',
    question:
      "People's stories and emotions speak louder to you than numbers or data.",
    questionFr:
      'Les récits et émotions des personnes vous touchent plus que les chiffres ou les données.',
  },
  {
    id: 11,
    dimension: 'T',
    direction: 'positive',
    question:
      "You prioritize facts over people's feelings when determining a course of action.",
    questionFr:
      'Vous donnez la priorité aux faits plutôt qu aux sentiments des personnes pour agir.',
  },
  {
    id: 12,
    dimension: 'T',
    direction: 'negative',
    question: 'You favor a sensitive approach over absolute honesty.',
    questionFr: 'Vous privilégiez une approche bienveillante plutôt qu une franchise absolue.',
  },

  {
    id: 13,
    dimension: 'J',
    direction: 'positive',
    question: 'Your living and working spaces are clean and highly organized.',
    questionFr: 'Vos espaces de vie et de travail sont propres et très bien organisés.',
  },
  {
    id: 14,
    dimension: 'J',
    direction: 'positive',
    question:
      'You prioritize and plan tasks effectively, often completing them well before the deadline.',
    questionFr:
      'Vous planifiez vos tâches avec efficacité, en les terminant souvent bien avant la date limite.',
  },
  {
    id: 15,
    dimension: 'J',
    direction: 'negative',
    question: 'You often let the day unfold without any schedule.',
    questionFr: 'Vous laissez souvent la journée se dérouler sans aucun planning précis.',
  },
  {
    id: 16,
    dimension: 'J',
    direction: 'positive',
    question:
      'You prefer to finish your chores before allowing yourself to relax.',
    questionFr:
      'Vous préférez terminer vos tâches avant de vous autoriser à vous détendre.',
  },

  {
    id: 17,
    dimension: 'A',
    direction: 'positive',
    question: 'You generally remain calm, even under high pressure.',
    questionFr: 'Vous restez généralement calme, même sous une forte pression.',
  },
  {
    id: 18,
    dimension: 'A',
    direction: 'negative',
    question:
      'Even a small mistake can cause you to doubt your overall abilities.',
    questionFr:
      'Une simple petite erreur peut vous faire douter de l ensemble de vos capacités.',
  },
  {
    id: 19,
    dimension: 'A',
    direction: 'positive',
    question:
      'You rarely worry about making a good impression on people you meet.',
    questionFr:
      'Vous vous souciez rarement de faire bonne impression auprès des personnes que vous rencontrez.',
  },
  {
    id: 20,
    dimension: 'A',
    direction: 'negative',
    question: 'You tend to worry that things will go from bad to worse.',
    questionFr: 'Vous avez tendance à craindre que les choses ne tournent de mal en pis.',
  },
]
