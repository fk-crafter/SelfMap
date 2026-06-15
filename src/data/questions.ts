export interface ApiQuestion {
  id: number
  dimension: 'E' | 'N' | 'T' | 'J' | 'A'
  direction: 'positive' | 'negative'
  question: string
}

export const questions: ApiQuestion[] = [
  {
    id: 1,
    dimension: 'E',
    direction: 'positive',
    question: 'You regularly make new friends.',
  },
  {
    id: 2,
    dimension: 'E',
    direction: 'negative',
    question: 'You find the idea of networking highly intimidating.',
  },
  {
    id: 3,
    dimension: 'E',
    direction: 'positive',
    question: 'You enjoy participating in team-based activities.',
  },
  {
    id: 4,
    dimension: 'E',
    direction: 'negative',
    question: 'You prefer solitary hobbies or activities over group ones.',
  },

  {
    id: 5,
    dimension: 'N',
    direction: 'positive',
    question:
      'Complex and innovative ideas excite you more than simple and straightforward ones.',
  },
  {
    id: 6,
    dimension: 'N',
    direction: 'negative',
    question:
      'You do not particularly enjoy discussions about various interpretations of creative works.',
  },
  {
    id: 7,
    dimension: 'N',
    direction: 'positive',
    question: 'You like experimenting with new and untested approaches.',
  },
  {
    id: 8,
    dimension: 'N',
    direction: 'positive',
    question:
      'You are constantly looking for new fields of knowledge to explore.',
  },

  {
    id: 9,
    dimension: 'T',
    direction: 'negative',
    question:
      'You are more easily swayed by emotional appeals than by factual arguments.',
  },
  {
    id: 10,
    dimension: 'T',
    direction: 'negative',
    question:
      "People's stories and emotions speak louder to you than numbers or data.",
  },
  {
    id: 11,
    dimension: 'T',
    direction: 'positive',
    question:
      "You prioritize facts over people's feelings when determining a course of action.",
  },
  {
    id: 12,
    dimension: 'T',
    direction: 'negative',
    question: 'You favor a sensitive approach over absolute honesty.',
  },

  {
    id: 13,
    dimension: 'J',
    direction: 'positive',
    question: 'Your living and working spaces are clean and highly organized.',
  },
  {
    id: 14,
    dimension: 'J',
    direction: 'positive',
    question:
      'You prioritize and plan tasks effectively, often completing them well before the deadline.',
  },
  {
    id: 15,
    dimension: 'J',
    direction: 'negative',
    question: 'You often let the day unfold without any schedule.',
  },
  {
    id: 16,
    dimension: 'J',
    direction: 'positive',
    question:
      'You prefer to finish your chores before allowing yourself to relax.',
  },

  {
    id: 17,
    dimension: 'A',
    direction: 'positive',
    question: 'You generally remain calm, even under high pressure.',
  },
  {
    id: 18,
    dimension: 'A',
    direction: 'negative',
    question:
      'Even a small mistake can cause you to doubt your overall abilities.',
  },
  {
    id: 19,
    dimension: 'A',
    direction: 'positive',
    question:
      'You rarely worry about making a good impression on people you meet.',
  },
  {
    id: 20,
    dimension: 'A',
    direction: 'negative',
    question: 'You tend to worry that things will go from bad to worse.',
  },
]
