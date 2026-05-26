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
    question: 'Vous vous faites fréquemment de nouveaux amis.',
    answers: [
      {
        title: "D'accord",
        description: 'Aller vers les autres est naturel pour moi.',
      },
      {
        title: 'En désaccord',
        description: "Je préfère mon cercle d'amis restreint.",
      },
    ],
  },
  {
    id: 2,
    dimension: 'I/E',
    question: "Vous trouvez l'idée de réseauter très intimidante.",
    answers: [
      {
        title: "D'accord",
        description: "Me mettre en avant me met mal à l'aise.",
      },
      {
        title: 'En désaccord',
        description: "C'est un exercice qui me stimule.",
      },
    ],
  },
  {
    id: 3,
    dimension: 'I/E',
    question: 'Vous appréciez participer à des activités en équipe.',
    answers: [
      {
        title: "D'accord",
        description: "L'intelligence collective me stimule.",
      },
      {
        title: 'En désaccord',
        description: 'Je suis plus efficace et concentré en solitaire.',
      },
    ],
  },
  {
    id: 4,
    dimension: 'I/E',
    question: "Vous appréciez davantage les activités solitaires qu'en groupe.",
    answers: [
      {
        title: "D'accord",
        description: 'Mes moments seuls sont mes meilleures ressources.',
      },
      {
        title: 'En désaccord',
        description: 'Partager mes loisirs décuple mon plaisir.',
      },
    ],
  },
  {
    id: 5,
    dimension: 'S/N',
    question:
      'Les idées complexes et novatrices vous enthousiasment plus que les idées simples et directes.',
    answers: [
      {
        title: "D'accord",
        description: "J'aime explorer des concepts abstraits.",
      },
      {
        title: 'En désaccord',
        description: 'Je préfère ce qui est concret et applicable.',
      },
    ],
  },
  {
    id: 6,
    dimension: 'S/N',
    question:
      "Vous n'aimez pas particulièrement les discussions portant sur les interprétations des œuvres créatives.",
    answers: [
      {
        title: "D'accord",
        description: 'Je préfère les faits clairs aux débats sans fin.',
      },
      {
        title: 'En désaccord',
        description: "J'adore débattre des sens cachés et des théories.",
      },
    ],
  },
  {
    id: 7,
    dimension: 'S/N',
    question: 'Vous aimez expérimenter des approches nouvelles et non testées.',
    answers: [
      {
        title: "D'accord",
        description: "L'innovation et le risque m'attirent.",
      },
      {
        title: 'En désaccord',
        description: 'Je préfère les méthodes qui ont déjà fait leurs preuves.',
      },
    ],
  },
  {
    id: 8,
    dimension: 'S/N',
    question:
      'Vous êtes en quête permanente de nouveaux domaines de connaissances à explorer.',
    answers: [
      { title: "D'accord", description: "Ma curiosité n'a pas de limites." },
      {
        title: 'En désaccord',
        description: 'Je préfère approfondir ce que je connais déjà.',
      },
    ],
  },
  {
    id: 9,
    dimension: 'T/F',
    question:
      'Vous vous laissez facilement convaincre par des émotions qui vous touchent que par des arguments factuels.',
    answers: [
      {
        title: "D'accord",
        description: "L'humain et l'empathie priment dans mes choix.",
      },
      {
        title: 'En désaccord',
        description: 'La logique et les faits dictent mes décisions.',
      },
    ],
  },
  {
    id: 10,
    dimension: 'T/F',
    question:
      'Les récits et les émotions des gens vous parlent plus fort que les chiffres.',
    answers: [
      {
        title: "D'accord",
        description: "L'experience humaine a plus de valeur à mes yeux.",
      },
      {
        title: 'En désaccord',
        description: 'Les statistiques sont la seule vérité objective.',
      },
    ],
  },
  {
    id: 11,
    dimension: 'T/F',
    question:
      "Vous accordez la priorité aux faits plutôt qu'aux sentiments lors d'une prise de décision.",
    answers: [
      {
        title: "D'accord",
        description: "L'efficacité passe avant les susceptibilités.",
      },
      {
        title: 'En désaccord',
        description: "L'impact humain est ma priorité absolue.",
      },
    ],
  },
  {
    id: 12,
    dimension: 'T/F',
    question:
      "Vous privilégiez une attitude sensible plutôt qu'une honnêteté totale.",
    answers: [
      {
        title: "D'accord",
        description: "Toute vérité n'est pas bonne à dire si elle blesse.",
      },
      {
        title: 'En désaccord',
        description: 'La franchise est plus importante que le réconfort.',
      },
    ],
  },
  {
    id: 13,
    dimension: 'J/P',
    question: 'Vos espaces de vie et de travail sont propres et organisés.',
    answers: [
      {
        title: "D'accord",
        description: "L'ordre m'aide à avoir l'esprit clair.",
      },
      {
        title: 'En désaccord',
        description: "Mon environnement peut être chaotique, je m'y retrouve.",
      },
    ],
  },
  {
    id: 14,
    dimension: 'J/P',
    question: 'Vous priorisez et planifiez les tâches de manière efficace.',
    answers: [
      {
        title: "D'accord",
        description: "J'anticipe toujours pour ne pas être pris de court.",
      },
      {
        title: 'En désaccord',
        description:
          "Je travaille souvent dans l'urgence à la dernière minute.",
      },
    ],
  },
  {
    id: 15,
    dimension: 'J/P',
    question:
      'Vous laissez souvent la journée se dérouler sans aucun programme.',
    answers: [
      {
        title: "D'accord",
        description: "J'aime vivre l'instant présent sans contrainte.",
      },
      {
        title: 'En désaccord',
        description: "J'ai besoin de savoir comment ma journée va s'organiser.",
      },
    ],
  },
  {
    id: 16,
    dimension: 'J/P',
    question:
      'Vous préférez vous acquitter de vos tâches avant de vous laisser aller à la détente.',
    answers: [
      { title: "D'accord", description: 'Le devoir avant le plaisir.' },
      {
        title: 'En désaccord',
        description: 'Je mixe travail et détente selon mon inspiration.',
      },
    ],
  },
  {
    id: 17,
    dimension: 'A/T',
    question: 'Vous restez généralement calme, même sous une forte pression.',
    answers: [
      { title: "D'accord", description: "Le stress a peu d'emprise sur moi." },
      {
        title: 'En désaccord',
        description: 'Je peux vite me sentir submergé.',
      },
    ],
  },
  {
    id: 18,
    dimension: 'A/T',
    question: 'Même une petite erreur peut vous faire douter de vos capacités.',
    answers: [
      {
        title: "D'accord",
        description: 'Je suis très exigeant envers moi-même.',
      },
      {
        title: 'En désaccord',
        description: "L'erreur est humaine, je passe vite à autre chose.",
      },
    ],
  },
  {
    id: 19,
    dimension: 'A/T',
    question:
      'Vous vous souciez rarement de faire bonne impression auprès des gens que vous rencontrez.',
    answers: [
      {
        title: "D'accord",
        description: "Je reste moi-même, peu importe ce qu'on pense.",
      },
      {
        title: 'En désaccord',
        description: "L'image que je renvoie est importante pour moi.",
      },
    ],
  },
  {
    id: 20,
    dimension: 'A/T',
    question:
      'Vous avez tendance à vous inquiéter que les choses aillent de mal en pis.',
    answers: [
      {
        title: "D'accord",
        description: "J'envisage souvent le pire scénario.",
      },
      {
        title: 'En désaccord',
        description: "Je suis d'un naturel confiant et optimiste.",
      },
    ],
  },
]
