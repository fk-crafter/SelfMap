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
    id: 3,
    dimension: 'T/F',
    question:
      'Vous vous laissez en général plus facilement convaincre par des émotions qui vous touchent que par des arguments factuels.',
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
    id: 4,
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
    id: 5,
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
    id: 6,
    dimension: 'I/E',
    question:
      "Vous trouvez l'idée de réseauter ou de vous promouvoir auprès d'étrangers très intimidante.",
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
    id: 7,
    dimension: 'J/P',
    question:
      'Vous priorisez et planifiez les tâches de manière efficace, les accomplissant souvent bien avant la date limite.',
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
    id: 8,
    dimension: 'T/F',
    question:
      'Les récits et les émotions des gens vous parlent plus fort que les chiffres ou les données.',
    answers: [
      {
        title: "D'accord",
        description: "L'expérience humaine a plus de valeur à mes yeux.",
      },
      {
        title: 'En désaccord',
        description: 'Les statistiques sont la seule vérité objective.',
      },
    ],
  },
  {
    id: 9,
    dimension: 'J/P',
    question:
      'Vous aimez recourir à des outils de gestion tels que les calendriers et les listes.',
    answers: [
      { title: "D'accord", description: 'Tout doit être noté et structuré.' },
      {
        title: 'En désaccord',
        description: 'Je garde tout en tête et fais au feeling.',
      },
    ],
  },
  {
    id: 10,
    dimension: 'A/T',
    question:
      'Même une petite erreur peut vous faire douter de vos capacités et de vos connaissances.',
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
    id: 11,
    dimension: 'I/E',
    question:
      "Vous n'avez aucun mal à aller vers quelqu'un que vous trouvez intéressant et à entamer une conversation.",
    answers: [
      {
        title: "D'accord",
        description: 'Briser la glace est facile pour moi.',
      },
      {
        title: 'En désaccord',
        description: "J'attends souvent que l'autre fasse le premier pas.",
      },
    ],
  },
  {
    id: 12,
    dimension: 'S/N',
    question:
      "Vous n'aimez pas particulièrement les discussions portant sur les différentes interprétations des œuvres créatives.",
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
    id: 13,
    dimension: 'T/F',
    question:
      "Vous accordez la priorité aux faits plutôt qu'aux sentiments des gens lorsque vous déterminez une ligne de conduite.",
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
    dimension: 'S/N',
    question:
      'Vous êtes en quête permanente de nouvelles expériences et de nouveaux domaines de connaissances à explorer.',
    answers: [
      { title: "D'accord", description: "Ma curiosité n'a pas de limites." },
      {
        title: 'En désaccord',
        description: 'Je préfère approfondir ce que je connais déjà.',
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
  {
    id: 21,
    dimension: 'I/E',
    question:
      "Vous appréciez davantage les passe-temps ou les activités solitaires qu'en groupe.",
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
    id: 22,
    dimension: 'S/N',
    question: "Vous ne vous voyez pas exercer un métier d'écrivain de fiction.",
    answers: [
      {
        title: "D'accord",
        description: "J'ai besoin de travailler sur du concret.",
      },
      {
        title: 'En désaccord',
        description: 'Inventer des mondes et des histoires me fascine.',
      },
    ],
  },
  {
    id: 23,
    dimension: 'T/F',
    question:
      'Vous préconisez des décisions efficaces, même si cela implique de faire abstraction de certains aspects émotionnels.',
    answers: [
      {
        title: "D'accord",
        description: "Le but à atteindre est plus important que l'état d'âme.",
      },
      {
        title: 'En désaccord',
        description:
          "Une décision efficace doit respecter l'harmonie du groupe.",
      },
    ],
  },
  {
    id: 24,
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
    id: 25,
    dimension: 'T/F',
    question:
      "En cas de désaccord, vous privilégiez la défense de votre point de vue au détriment des sentiments d'autrui.",
    answers: [
      {
        title: "D'accord",
        description: "La vérité du débat importe plus que l'ego.",
      },
      {
        title: 'En désaccord',
        description: "Je préfère céder plutôt que de blesser quelqu'un.",
      },
    ],
  },
  {
    id: 26,
    dimension: 'I/E',
    question:
      'Vous attendez généralement que les autres se présentent en premier lors des réunions sociales.',
    answers: [
      {
        title: "D'accord",
        description: "Je préfère observer avant de m'intégrer.",
      },
      {
        title: 'En désaccord',
        description: 'Je vais naturellement vers les nouveaux venus.',
      },
    ],
  },
  {
    id: 27,
    dimension: 'A/T',
    question: 'Votre humeur peut changer très rapidement.',
    answers: [
      {
        title: "D'accord",
        description: 'Je suis réceptif et sensible à mon environnement.',
      },
      {
        title: 'En désaccord',
        description: 'Je suis émotionnellement très stable.',
      },
    ],
  },
  {
    id: 28,
    dimension: 'T/F',
    question:
      'Vous ne vous laissez pas facilement influencer par des arguments émotionnels.',
    answers: [
      {
        title: "D'accord",
        description: "Seule la logique peut me faire changer d'avis.",
      },
      {
        title: 'En désaccord',
        description: 'Un témoignage touchant peut bouleverser mes certitudes.',
      },
    ],
  },
  {
    id: 29,
    dimension: 'J/P',
    question:
      'Vous vous retrouvez souvent à faire les choses à la dernière minute.',
    answers: [
      {
        title: "D'accord",
        description: 'La pression de la deadline me rend créatif.',
      },
      {
        title: 'En désaccord',
        description: "Je déteste l'urgence et le travail bâclé.",
      },
    ],
  },
  {
    id: 30,
    dimension: 'S/N',
    question: 'Vous aimez débattre de dilemmes éthiques.',
    answers: [
      {
        title: "D'accord",
        description: "J'adore philosopher sur le bien et le mal.",
      },
      {
        title: 'En désaccord',
        description: "C'est une perte de temps sans réponse concrète.",
      },
    ],
  },
  {
    id: 31,
    dimension: 'I/E',
    question: 'Vous préférez généralement être entouré que seul.',
    answers: [
      { title: "D'accord", description: "La solitude m'ennuie rapidement." },
      {
        title: 'En désaccord',
        description: "J'apprécie et je recherche la tranquillité.",
      },
    ],
  },
  {
    id: 32,
    dimension: 'S/N',
    question:
      'Vous vous lassez ou perdez tout intérêt lorsque la discussion devient très théorique.',
    answers: [
      {
        title: "D'accord",
        description: 'Il me faut du concret et des exemples pratiques.',
      },
      {
        title: 'En désaccord',
        description: "J'adore manier les théories et les concepts.",
      },
    ],
  },
  {
    id: 33,
    dimension: 'T/F',
    question:
      'En cas de conflit entre les faits et les sentiments, vous suivez généralement votre cœur.',
    answers: [
      {
        title: "D'accord",
        description: 'Mon intuition émotionnelle est ma meilleure boussole.',
      },
      {
        title: 'En désaccord',
        description: "La raison doit toujours triompher sur l'affect.",
      },
    ],
  },
  {
    id: 34,
    dimension: 'J/P',
    question:
      "Vous avez du mal à maintenir un horaire de travail ou d'études cohérent.",
    answers: [
      {
        title: "D'accord",
        description: "Ma routine varie selon mon niveau d'énergie.",
      },
      {
        title: 'En désaccord',
        description: 'Je suis discipliné et régulier dans mes horaires.',
      },
    ],
  },
  {
    id: 35,
    dimension: 'A/T',
    question:
      'Vous remettez rarement en question les choix que vous avez faits.',
    answers: [
      {
        title: "D'accord",
        description: "Une fois décidé, j'avance sans regarder en arrière.",
      },
      {
        title: 'En désaccord',
        description: "Le doute m'habite souvent après coup.",
      },
    ],
  },
  {
    id: 36,
    dimension: 'I/E',
    question: 'Vos amis vous décriraient comme étant enjoué et extraverti.',
    answers: [
      {
        title: "D'accord",
        description: "Je suis souvent le moteur de l'ambiance.",
      },
      {
        title: 'En désaccord',
        description: 'Je suis plutôt du genre calme et posé.',
      },
    ],
  },
  {
    id: 37,
    dimension: 'S/N',
    question:
      "Vous êtes attiré par diverses formes d'expression créative, comme l'écriture.",
    answers: [
      {
        title: "D'accord",
        description: "L'art et la créativité font partie de moi.",
      },
      {
        title: 'En désaccord',
        description: "J'ai un esprit plus analytique qu'artistique.",
      },
    ],
  },
  {
    id: 38,
    dimension: 'T/F',
    question:
      'Vous fondez généralement vos choix sur des faits objectives plutôt que sur des impressions émotionnelles.',
    answers: [
      {
        title: "D'accord",
        description: "L'objectivité est la clé d'une bonne décision.",
      },
      {
        title: 'En désaccord',
        description: 'Mon ressenti est une donnée tout aussi valide.',
      },
    ],
  },
  {
    id: 39,
    dimension: 'J/P',
    question: 'Vous aimez dresser une liste de choses à faire au quotidien.',
    answers: [
      {
        title: "D'accord",
        description: 'Rien ne vaut le plaisir de rayer une tâche terminée.',
      },
      {
        title: 'En désaccord',
        description: "Les listes m'enferment et m'étouffent.",
      },
    ],
  },
  {
    id: 40,
    dimension: 'A/T',
    question: 'Vous manquez rarement de confiance en vous.',
    answers: [
      {
        title: "D'accord",
        description: 'Je connais ma valeur et mes capacités.',
      },
      {
        title: 'En désaccord',
        description: "Le syndrome de l'imposteur n'est jamais loin.",
      },
    ],
  },
  {
    id: 41,
    dimension: 'I/E',
    question: 'Vous évitez de passer des appels téléphoniques.',
    answers: [
      {
        title: "D'accord",
        description: 'Je préfère largement les messages écrits.',
      },
      {
        title: 'En désaccord',
        description: 'Appeler est plus rapide et plus chaleureux.',
      },
    ],
  },
  {
    id: 42,
    dimension: 'S/N',
    question:
      'Vous aimez découvrir des idées et des points de vue qui ne vous sont pas familiers.',
    answers: [
      {
        title: "D'accord",
        description: 'Sortir de ma zone de confort intellectuelle est vital.',
      },
      {
        title: 'En désaccord',
        description: 'Je préfère consolider mon propre système de pensée.',
      },
    ],
  },
  {
    id: 43,
    dimension: 'I/E',
    question:
      'Il vous est facile de nouer des liens avec des personnes que vous venez de rencontrer.',
    answers: [
      {
        title: "D'accord",
        description: "Le contact s'établit très naturellement.",
      },
      {
        title: 'En désaccord',
        description: "Il me faut du temps pour m'ouvrir aux autres.",
      },
    ],
  },
  {
    id: 44,
    dimension: 'J/P',
    question:
      'Si vos projets sont interrompus, votre priorité absolue est de reprendre le cours de vos activités le plus rapidement possible.',
    answers: [
      {
        title: "D'accord",
        description: 'Je déteste laisser les choses en suspens.',
      },
      {
        title: 'En désaccord',
        description: "Je suis flexible, l'interruption ne me dérange pas.",
      },
    ],
  },
  {
    id: 45,
    dimension: 'A/T',
    question:
      'Vous êtes encore préoccupé par des erreurs que vous avez commises il y a longtemps.',
    answers: [
      {
        title: "D'accord",
        description: 'Certains souvenirs me hantent et me font réfléchir.',
      },
      {
        title: 'En désaccord',
        description: "Le passé est le passé, j'avance.",
      },
    ],
  },
  {
    id: 46,
    dimension: 'S/N',
    question:
      "Vous n'êtes pas très intéressé par les théories sur ce à quoi le monde pourrait ressembler à l'avenir.",
    answers: [
      {
        title: "D'accord",
        description: 'Le présent offre déjà bien assez à traiter.',
      },
      {
        title: 'En désaccord',
        description: 'Imaginer le futur est fascinant.',
      },
    ],
  },
  {
    id: 47,
    dimension: 'A/T',
    question: 'Vos émotions vous contrôlent plus que vous ne les contrôlez.',
    answers: [
      {
        title: "D'accord",
        description: 'Mes ressentis dictent souvent ma conduite.',
      },
      {
        title: 'En désaccord',
        description: 'Je garde toujours le contrôle de moi-même.',
      },
    ],
  },
  {
    id: 48,
    dimension: 'T/F',
    question:
      'Lorsque vous prenez des décisions, vous vous souciez davantage de ce que peuvent ressentir les personnes concernées plutôt que de ce qui est le plus logique ou plus efficace.',
    answers: [
      {
        title: "D'accord",
        description: "L'harmonie du groupe est prioritaire.",
      },
      {
        title: 'En désaccord',
        description: "L'efficacité ne doit pas être entravée par les émotions.",
      },
    ],
  },
  {
    id: 49,
    dimension: 'J/P',
    question:
      "Votre style de travail personnel s'apparente davantage à des explosions d'énergie spontanées qu'à d'efforts organisés et cohérents.",
    answers: [
      {
        title: "D'accord",
        description: "Je marche à l'inspiration et aux coups de boost.",
      },
      {
        title: 'En désaccord',
        description: 'Je suis le roi/la reine de la progression constante.',
      },
    ],
  },
  {
    id: 50,
    dimension: 'A/T',
    question:
      "Lorsque quelqu'un vous tient en haute estime, vous vous demandez combien de temps il vous faudra pour le décevoir.",
    answers: [
      {
        title: "D'accord",
        description: 'La peur de décevoir est très présente chez moi.',
      },
      {
        title: 'En désaccord',
        description: "J'acceptte les compliments à leur juste valeur.",
      },
    ],
  },
  {
    id: 51,
    dimension: 'I/E',
    question:
      'Vous aimeriez un travail qui vous demande de travailler seul la plupart du temps.',
    answers: [
      { title: "D'accord", description: "L'autonomie totale est mon rêve." },
      {
        title: 'En désaccord',
        description: "Sans collègues, je m'étiolerais.",
      },
    ],
  },
  {
    id: 52,
    dimension: 'S/N',
    question:
      'Vous estimez que la réflexion sur des questions philosophiques abstraites est une perte de temps.',
    answers: [
      {
        title: "D'accord",
        description: "L'action vaut mieux que les longs discours théoriques.",
      },
      {
        title: 'En désaccord',
        description: 'La philosophie permet de comprendre le monde.',
      },
    ],
  },
  {
    id: 53,
    dimension: 'I/E',
    question:
      "Vous vous sentez plus attiré par les lieux à l'atmosphère animée que par les lieux calmes et intimes.",
    answers: [
      {
        title: "D'accord",
        description: "L'effervescence me donne de l'énergie.",
      },
      {
        title: 'En désaccord',
        description: 'Rien ne vaut un endroit paisible pour se retrouver.',
      },
    ],
  },
  {
    id: 54,
    dimension: 'S/N',
    question:
      'Si une décision vous semble juste, vous agissez souvent sans nécessiter davantage de preuves.',
    answers: [
      { title: "D'accord", description: 'Mon instinct se trompe rarement.' },
      {
        title: 'En désaccord',
        description: 'Il me faut toujours des données tangibles.',
      },
    ],
  },
  {
    id: 55,
    dimension: 'A/T',
    question: 'Vous vous sentez souvent submergé.',
    answers: [
      {
        title: "D'accord",
        description: 'La charge mentale est parfois trop lourde.',
      },
      {
        title: 'En désaccord',
        description: 'Je gère la pression de façon sereine.',
      },
    ],
  },
  {
    id: 56,
    dimension: 'J/P',
    question:
      "Vous accomplissez les tâches méthodiquement, sans sauter d'étapes.",
    answers: [
      {
        title: "D'accord",
        description: 'Les procédures existent pour une bonne raison.',
      },
      {
        title: 'En désaccord',
        description: 'Je trouve des raccourcis selon la situation.',
      },
    ],
  },
  {
    id: 57,
    dimension: 'S/N',
    question:
      'Vous préférez les tâches qui nécessitent de trouver des solutions créatives plutôt que de suivre des étapes concrètes.',
    answers: [
      {
        title: "D'accord",
        description: 'Sortir des sentiers battus est ce qui me plaît.',
      },
      {
        title: 'En désaccord',
        description: "Une trame claire me permet d'être plus efficace.",
      },
    ],
  },
  {
    id: 58,
    dimension: 'T/F',
    question:
      "Vous vous fiez davantage à votre intuition émotionnelle qu'à votre raisonnement logique au moment de faire un choix.",
    answers: [
      { title: "D'accord", description: 'Le ressenti ne ment pas.' },
      {
        title: 'En désaccord',
        description: 'Le raisonnement cartésien est plus sûr.',
      },
    ],
  },
  {
    id: 59,
    dimension: 'J/P',
    question: 'Vous avez du mal à respecter les délais.',
    answers: [
      {
        title: "D'accord",
        description: 'Le temps est une notion un peu floue pour moi.',
      },
      {
        title: 'En désaccord',
        description: 'Être ponctuel est une marque de respect.',
      },
    ],
  },
  {
    id: 60,
    dimension: 'A/T',
    question:
      "Vous êtes confiant dans le fait que les choses vont s'arranger pour vous.",
    answers: [
      {
        title: "D'accord",
        description: 'Je vois toujours le verre à moitié plein.',
      },
      {
        title: 'En désaccord',
        description: 'Il faut toujours se préparer au pire.',
      },
    ],
  },
]
