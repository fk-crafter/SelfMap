export interface ApiQuestion {
  id: number
  dimension: string
  question: string
  answers: {
    title: string
    description: string
  }[]
}

export const questions: ApiQuestion[] = [
  {
    id: 1,
    dimension: 'I/E',
    question: 'You regularly make new friends.',
    answers: [
      {
        title: 'Agree',
        description: 'Reaching out to others comes naturally to me.',
      },
      {
        title: 'Disagree',
        description: 'I prefer my small, tight-knit circle of friends.',
      },
    ],
  },
  {
    id: 2,
    dimension: 'I/E',
    question: 'You find the idea of networking highly intimidating.',
    answers: [
      {
        title: 'Agree',
        description: 'Putting myself out there makes me uncomfortable.',
      },
      {
        title: 'Disagree',
        description: "It's an exercise that stimulates me.",
      },
    ],
  },
  {
    id: 3,
    dimension: 'I/E',
    question: 'You enjoy participating in team-based activities.',
    answers: [
      { title: 'Agree', description: 'Collective intelligence energizes me.' },
      {
        title: 'Disagree',
        description: 'I am more efficient and focused when working alone.',
      },
    ],
  },
  {
    id: 4,
    dimension: 'I/E',
    question: 'You prefer solitary hobbies or activities over group ones.',
    answers: [
      { title: 'Agree', description: 'My alone time is my best resource.' },
      {
        title: 'Disagree',
        description: 'Sharing my hobbies multiplies my enjoyment.',
      },
    ],
  },
  {
    id: 5,
    dimension: 'S/N',
    question:
      'Complex and innovative ideas excite you more than simple and straightforward ones.',
    answers: [
      { title: 'Agree', description: 'I love exploring abstract concepts.' },
      {
        title: 'Disagree',
        description: 'I prefer what is concrete and applicable.',
      },
    ],
  },
  {
    id: 6,
    dimension: 'S/N',
    question:
      'You do not particularly enjoy discussions about various interpretations of creative works.',
    answers: [
      {
        title: 'Agree',
        description: 'I prefer clear facts over endless debates.',
      },
      {
        title: 'Disagree',
        description: 'I love debating hidden meanings and theories.',
      },
    ],
  },
  {
    id: 7,
    dimension: 'S/N',
    question: 'You like experimenting with new and untested approaches.',
    answers: [
      { title: 'Agree', description: 'Innovation and risk attract me.' },
      {
        title: 'Disagree',
        description: 'I prefer methods that have already proven themselves.',
      },
    ],
  },
  {
    id: 8,
    dimension: 'S/N',
    question:
      'You are constantly looking for new fields of knowledge to explore.',
    answers: [
      { title: 'Agree', description: 'My curiosity has no limits.' },
      {
        title: 'Disagree',
        description: 'I prefer to deepen what I already know.',
      },
    ],
  },
  {
    id: 9,
    dimension: 'T/F',
    question:
      'You are more easily swayed by emotional appeals than by factual arguments.',
    answers: [
      {
        title: 'Agree',
        description: 'Empathy and human connection guide my choices.',
      },
      {
        title: 'Disagree',
        description: 'Logic and facts dictate my decisions.',
      },
    ],
  },
  {
    id: 10,
    dimension: 'T/F',
    question:
      "People's stories and emotions speak louder to you than numbers or data.",
    answers: [
      {
        title: 'Agree',
        description: 'The human experience holds more value to me.',
      },
      {
        title: 'Disagree',
        description: 'Statistics are the only objective truth.',
      },
    ],
  },
  {
    id: 11,
    dimension: 'T/F',
    question:
      "You prioritize facts over people's feelings when determining a course of action.",
    answers: [
      {
        title: 'Agree',
        description: 'Efficiency comes before personal sensitivities.',
      },
      {
        title: 'Disagree',
        description: 'The human impact is my absolute priority.',
      },
    ],
  },
  {
    id: 12,
    dimension: 'T/F',
    question: 'You favor a sensitive approach over absolute honesty.',
    answers: [
      {
        title: 'Agree',
        description: 'Not all truths are good to say if they hurt.',
      },
      {
        title: 'Disagree',
        description: 'Honesty is more important than comfort.',
      },
    ],
  },
  {
    id: 13,
    dimension: 'J/P',
    question: 'Your living and working spaces are clean and highly organized.',
    answers: [
      { title: 'Agree', description: 'Order helps me keep a clear mind.' },
      {
        title: 'Disagree',
        description: 'My environment can be chaotic, but I know my way around.',
      },
    ],
  },
  {
    id: 14,
    dimension: 'J/P',
    question:
      'You prioritize and plan tasks effectively, often completing them well before the deadline.',
    answers: [
      {
        title: 'Agree',
        description: 'I always anticipate so I am never caught off guard.',
      },
      {
        title: 'Disagree',
        description: 'I often work best under pressure at the last minute.',
      },
    ],
  },
  {
    id: 15,
    dimension: 'J/P',
    question: 'You often let the day unfold without any schedule.',
    answers: [
      {
        title: 'Agree',
        description: 'I like living in the present moment without constraints.',
      },
      {
        title: 'Disagree',
        description: 'I need to know how my day is going to be structured.',
      },
    ],
  },
  {
    id: 16,
    dimension: 'J/P',
    question:
      'You prefer to finish your chores before allowing yourself to relax.',
    answers: [
      { title: 'Agree', description: 'Duty before pleasure.' },
      {
        title: 'Disagree',
        description: 'I mix work and relaxation depending on my inspiration.',
      },
    ],
  },
  {
    id: 17,
    dimension: 'A/T',
    question: 'You generally remain calm, even under high pressure.',
    answers: [
      { title: 'Agree', description: 'Stress has little hold on me.' },
      { title: 'Disagree', description: 'I can easily feel overwhelmed.' },
    ],
  },
  {
    id: 18,
    dimension: 'A/T',
    question:
      'Even a small mistake can cause you to doubt your overall abilities.',
    answers: [
      { title: 'Agree', description: 'I am very demanding of myself.' },
      { title: 'Disagree', description: 'To err is human, I quickly move on.' },
    ],
  },
  {
    id: 19,
    dimension: 'A/T',
    question:
      'You rarely worry about making a good impression on people you meet.',
    answers: [
      {
        title: 'Agree',
        description: 'I stay true to myself, no matter what others think.',
      },
      {
        title: 'Disagree',
        description: 'The image I project is important to me.',
      },
    ],
  },
  {
    id: 20,
    dimension: 'A/T',
    question: 'You tend to worry that things will go from bad to worse.',
    answers: [
      {
        title: 'Agree',
        description: 'I often envision the worst-case scenario.',
      },
      {
        title: 'Disagree',
        description: 'I am naturally confident and optimistic.',
      },
    ],
  },
]
