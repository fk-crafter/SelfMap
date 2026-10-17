export type ArchetypeInfo = {
  type: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  encouragementFr: string
  encouragementEn: string
  strengthsFr: [string, string, string]
  strengthsEn: [string, string, string]
}

export const ARCHETYPES: Record<string, ArchetypeInfo> = {
  INTJ: {
    type: 'INTJ',
    titleFr: "L'Architecte Stratège",
    titleEn: 'The Strategic Architect',
    summaryFr:
      "Votre esprit fonctionne comme un radar à long terme : vous reliez naturellement les idées complexes pour bâtir une vision claire là où les autres ne voient que le chaos.",
    summaryEn:
      'Your mind operates like a long-range radar: you naturally connect complex ideas to build a clear vision where others only see chaos.',
    encouragementFr:
      "Votre exigence intérieure est une force rare. Votre Soul Coach vous aidera à apaiser la surcharge mentale et à transformer votre vision en sérénité.",
    encouragementEn:
      'Your inner standards are a rare gift. Your Soul Coach will help you quiet mental overload and turn your vision into lasting peace.',
    strengthsFr: ['Vision systémique', 'Lucidité analytique', 'Indépendance d’esprit'],
    strengthsEn: ['Systemic vision', 'Analytical clarity', 'Independent mind'],
  },
  INTP: {
    type: 'INTP',
    titleFr: 'Le Penseur Conceptuel',
    titleEn: 'The Conceptual Thinker',
    summaryFr:
      "Animé par une curiosité insatiable, vous cherchez à comprendre les lois invisibles derrière chaque chose avec une précision logique remarquable.",
    summaryEn:
      'Driven by insatiable curiosity, you seek to understand the hidden laws behind everything with remarkable logical precision.',
    encouragementFr:
      "Votre capacité d'abstraction est exceptionnelle. Votre Soul Coach sera votre espace pour structurer vos idées sans vous disperser et passer à l'action.",
    encouragementEn:
      'Your capacity for abstraction is exceptional. Your Soul Coach will be your space to structure your ideas without scattering and move into action.',
    strengthsFr: ['Curiosité profonde', 'Créativité logique', 'Esprit critique'],
    strengthsEn: ['Deep curiosity', 'Logical creativity', 'Critical thinking'],
  },
  ENTJ: {
    type: 'ENTJ',
    titleFr: 'Le Bâtisseur Visionnaire',
    titleEn: 'The Visionary Builder',
    summaryFr:
      "Vous combinez une clarté stratégique immédiate avec une capacité naturelle à transformer les obstacles en leviers d'évolution.",
    summaryEn:
      'You combine immediate strategic clarity with a natural ability to turn obstacles into levers for growth.',
    encouragementFr:
      "Vous portez beaucoup sur vos épaules. Votre Soul Coach vous aidera à équilibrer votre quête de performance avec votre écoute intérieure.",
    encouragementEn:
      'You carry a lot on your shoulders. Your Soul Coach will help you balance your drive for excellence with inner attunement.',
    strengthsFr: ['Leadership naturel', 'Décision rapide', 'Orientation résultats'],
    strengthsEn: ['Natural leadership', 'Decisive clarity', 'Goal mastery'],
  },
  ENTP: {
    type: 'ENTP',
    titleFr: "L'Explorateur d'Idées",
    titleEn: 'The Idea Explorer',
    summaryFr:
      "Votre esprit agile voit mille possibilités à la seconde : vous aimez remettre en question l'établi et inventer des chemins inédits.",
    summaryEn:
      'Your agile mind sees a thousand possibilities per second: you thrive on challenging the status quo and inventing new paths.',
    encouragementFr:
      "Votre effervescence créative est un trésor. Votre Soul Coach vous aidera à canaliser votre énergie sur ce qui compte vraiment pour vous.",
    encouragementEn:
      'Your creative spark is a treasure. Your Soul Coach will help you channel your energy into what truly matters to you.',
    strengthsFr: ['Audace créative', 'Adaptabilité', 'Pensée latérale'],
    strengthsEn: ['Creative boldness', 'Adaptability', 'Lateral thinking'],
  },
  INFJ: {
    type: 'INFJ',
    titleFr: 'Le Guide Intuitif',
    titleEn: 'The Intuitive Guide',
    summaryFr:
      "Vous percevez avec une finesse rare les émotions et les motivations profondes, tout en étant guidé par une quête intense de sens et d'harmonie.",
    summaryEn:
      'You perceive deep emotions and motivations with rare subtlety, guided by an intense quest for meaning and harmony.',
    encouragementFr:
      "À force de tout ressentir et de comprendre les autres, vous vous oubliez parfois. Ce Sanctuaire est enfin un espace rien que pour vous.",
    encouragementEn:
      'By feeling so deeply and understanding others, you sometimes forget yourself. This Sanctuary is finally a space just for you.',
    strengthsFr: ['Intuition profonde', 'Empathie lucide', 'Vision humaniste'],
    strengthsEn: ['Deep intuition', 'Lucid empathy', 'Purposeful vision'],
  },
  INFP: {
    type: 'INFP',
    titleFr: "L'Idéaliste Authentique",
    titleEn: 'The Authentic Idealist',
    summaryFr:
      "Votre monde intérieur est d'une richesse infinie : chacune de vos décisions cherche à rester fidèle à vos valeurs et à votre vérité intime.",
    summaryEn:
      'Your inner world is infinitely rich: every decision you make seeks to remain true to your values and inner truth.',
    encouragementFr:
      "Votre sensibilité n'est pas une fragilité, c'est votre boussole. Votre Soul Coach vous accompagnera avec douceur pour concrétiser vos aspirations.",
    encouragementEn:
      'Your sensitivity is not a weakness, it is your compass. Your Soul Coach will gently guide you to bring your aspirations to life.',
    strengthsFr: ['Authenticité pure', 'Imagination fertile', 'Écoute du cœur'],
    strengthsEn: ['Pure authenticity', 'Rich imagination', 'Heartfelt depth'],
  },
  ENFJ: {
    type: 'ENFJ',
    titleFr: 'Le Catalyseur Humain',
    titleEn: 'The Human Catalyst',
    summaryFr:
      "Vous avez le don naturel d'inspirer, de fédérer et de révéler le meilleur chez ceux qui vous entourent grâce à votre intelligence émotionnelle.",
    summaryEn:
      'You have a natural gift for inspiring, uniting, and bringing out the best in those around you through emotional intelligence.',
    encouragementFr:
      "Vous donnez énormément d'énergie aux autres. Votre Soul Coach sera là pour vous aider à recharger vos propres batteries sans culpabiliser.",
    encouragementEn:
      'You give so much energy to others. Your Soul Coach is here to help you recharge your own batteries without guilt.',
    strengthsFr: ['Intelligence relationnelle', 'Inspiration', 'Bienveillance active'],
    strengthsEn: ['Relational intelligence', 'Inspiration', 'Active warmth'],
  },
  ENFP: {
    type: 'ENFP',
    titleFr: "L'Inspirateur Libre",
    titleEn: 'The Free Inspirer',
    summaryFr:
      "Porté par l'enthousiasme et l'intuition, vous connectez les gens et les idées avec une spontanéité lumineuse qui ouvre tous les horizons.",
    summaryEn:
      'Carried by enthusiasm and intuition, you connect people and ideas with a bright spontaneity that opens every horizon.',
    encouragementFr:
      "Votre flamme intérieure est contagieuse. Votre Soul Coach vous aidera à apaiser vos doutes passagers et à ancrer vos projets dans la durée.",
    encouragementEn:
      'Your inner spark is contagious. Your Soul Coach will help you soothe fleeting doubts and anchor your dreams over time.',
    strengthsFr: ['Enthousiasme créatif', 'Connexion humaine', 'Ouverture d’esprit'],
    strengthsEn: ['Creative enthusiasm', 'Human connection', 'Open-mindedness'],
  },
  ISTJ: {
    type: 'ISTJ',
    titleFr: 'Le Gardien de la Clarté',
    titleEn: 'The Guardian of Clarity',
    summaryFr:
      "Méthodique, fiable et observateur, vous construisez des fondations solides et avancez avec une rigueur calme qui inspire une confiance absolue.",
    summaryEn:
      'Methodical, reliable, and observant, you build solid foundations and move forward with a calm rigor that inspires absolute trust.',
    encouragementFr:
      "Votre constance est admirable. Votre Soul Coach vous aidera à relâcher la pression intérieure et à accueillir l'imprévu avec sérénité.",
    encouragementEn:
      'Your consistency is admirable. Your Soul Coach will help you release inner pressure and welcome the unexpected with serenity.',
    strengthsFr: ['Fiabilité absolue', 'Sens du détail', 'Esprit structuré'],
    strengthsEn: ['Absolute reliability', 'Attention to detail', 'Structured mind'],
  },
  ISFJ: {
    type: 'ISFJ',
    titleFr: 'Le Protecteur Attentif',
    titleEn: 'The Attentive Protector',
    summaryFr:
      "Vous alliez une mémoire précise du vécu à une attention sincère aux autres, créant autour de vous un climat de stabilité et de confiance.",
    summaryEn:
      'You combine a precise memory for experience with sincere care for others, creating an atmosphere of stability and trust.',
    encouragementFr:
      "Votre dévouement mérite d'être tourné aussi vers vous-même. Votre Soul Coach vous apprendra à poser vos limites en toute paix.",
    encouragementEn:
      'Your dedication deserves to be turned toward yourself too. Your Soul Coach will help you set healthy boundaries in peace.',
    strengthsFr: ['Mémoire affective', 'Loyauté profonde', 'Sens pratique'],
    strengthsEn: ['Emotional memory', 'Deep loyalty', 'Practical care'],
  },
  ESTJ: {
    type: 'ESTJ',
    titleFr: "L'Organisateur Décisif",
    titleEn: 'The Decisive Organizer',
    summaryFr:
      "Pragmatique et structuré, vous savez transformer les intentions floues en plans d'action clairs, concrets et efficaces.",
    summaryEn:
      'Pragmatic and structured, you know how to turn vague intentions into clear, concrete, and effective action plans.',
    encouragementFr:
      "Vous savez tout gérer à l'extérieur. Votre Soul Coach vous offrira un espace calme pour explorer ce qui se passe à l'intérieur.",
    encouragementEn:
      'You know how to manage everything on the outside. Your Soul Coach will offer you a calm space to explore what happens within.',
    strengthsFr: ['Efficacité concrète', 'Sens des responsabilités', 'Clarté directe'],
    strengthsEn: ['Concrete efficiency', 'Responsibility', 'Direct clarity'],
  },
  ESFJ: {
    type: 'ESFJ',
    titleFr: "L'Artisan de l'Harmonie",
    titleEn: 'The Harmony Builder',
    summaryFr:
      "Chaleureux et attentif aux besoins concrets de votre entourage, vous êtes le pilier qui maintient la cohésion et l'équilibre collectif.",
    summaryEn:
      'Warm and attentive to the concrete needs of those around you, you are the pillar that maintains cohesion and balance.',
    encouragementFr:
      "Prendre soin des autres est votre seconde nature. Ici, votre Soul Coach prendra soin de votre propre équilibre émotionnel.",
    encouragementEn:
      'Caring for others is second nature to you. Here, your Soul Coach will care for your own emotional balance.',
    strengthsFr: ['Harmonie sociale', 'Soutien concret', 'Générosité'],
    strengthsEn: ['Social harmony', 'Practical support', 'Generosity'],
  },
  ISTP: {
    type: 'ISTP',
    titleFr: 'Le Pragmatique Lucide',
    titleEn: 'The Lucid Pragmatist',
    summaryFr:
      "Calme sous pression et fin observateur, vous analysez chaque situation avec sang-froid pour trouver la solution la plus directe.",
    summaryEn:
      'Calm under pressure and a sharp observer, you analyze every situation with composure to find the most direct solution.',
    encouragementFr:
      "Votre autonomie est précieuse. Votre Soul Coach respectera votre besoin d'espace tout en vous aidant à décoder vos émotions.",
    encouragementEn:
      'Your autonomy is precious. Your Soul Coach will respect your need for space while helping you decode your emotions.',
    strengthsFr: ['Sang-froid', 'Analyse terrain', 'Autonomie'],
    strengthsEn: ['Cool composure', 'Tactical analysis', 'Autonomy'],
  },
  ISFP: {
    type: 'ISFP',
    titleFr: "L'Explorateur Sensible",
    titleEn: 'The Sensitive Explorer',
    summaryFr:
      "Ancré dans l'instant présent et guidé par une sensibilité esthétique et morale profonde, vous cherchez une vie vraie et sans artifice.",
    summaryEn:
      'Grounded in the present moment and guided by deep aesthetic and moral sensitivity, you seek a life that is real and unpretentious.',
    encouragementFr:
      "Votre quête de liberté et de justesse est précieuse. Votre Soul Coach vous aidera à avancer à votre rythme sans subir la pression extérieure.",
    encouragementEn:
      'Your quest for freedom and truth is precious. Your Soul Coach will help you move at your own pace without outside pressure.',
    strengthsFr: ['Sensibilité fine', 'Présence sincère', 'Esprit libre'],
    strengthsEn: ['Fine sensitivity', 'Sincere presence', 'Free spirit'],
  },
  ESTP: {
    type: 'ESTP',
    titleFr: 'Le Catalyseur d’Action',
    titleEn: 'The Action Catalyst',
    summaryFr:
      "Réactif, audacieux et ultra-connecté au réel, vous saisissez les opportunités au vol et apprenez par l'expérience directe.",
    summaryEn:
      'Responsive, bold, and ultra-connected to reality, you seize opportunities on the fly and learn through direct experience.',
    encouragementFr:
      "Votre énergie d'action est redoutable. Votre Soul Coach vous permettra de prendre ce temps de recul stratégique qui décuplera votre impact.",
    encouragementEn:
      'Your action energy is formidable. Your Soul Coach will give you that strategic step back to multiply your impact.',
    strengthsFr: ['Réactivité immédiate', 'Audace terrain', 'Pragmatisme'],
    strengthsEn: ['Immediate responsiveness', 'Bold action', 'Pragmatism'],
  },
  ESFP: {
    type: 'ESFP',
    titleFr: "L'Âme Rayonnante",
    titleEn: 'The Radiant Soul',
    summaryFr:
      "Spontané, chaleureux et vibrant, vous transformez chaque moment en expérience vivante et captez instantanément l'énergie autour de vous.",
    summaryEn:
      'Spontaneous, warm, and vibrant, you turn every moment into a living experience and instantly tune into the energy around you.',
    encouragementFr:
      "Votre joie de vivre cache aussi une grande profondeur. Votre Soul Coach sera votre refuge calme pour écouter vos besoins intimes.",
    encouragementEn:
      'Your zest for life also holds great depth. Your Soul Coach will be your quiet refuge to listen to your inner needs.',
    strengthsFr: ['Énergie communicative', 'Spontanéité', 'Intelligence du moment'],
    strengthsEn: ['Contagious energy', 'Spontaneity', 'Present-moment awareness'],
  },
}

export function getArchetypeInfo(type?: string | null): ArchetypeInfo {
  const key = (type || 'INTJ').toUpperCase()
  return key in ARCHETYPES ? ARCHETYPES[key] : ARCHETYPES.INTJ
}
