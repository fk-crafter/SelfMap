export interface PlanFeature {
  text: string
  highlight?: boolean
}

export interface PlanConfig {
  id: 'FREE' | 'BETA' | 'PRO'
  name: string
  subtitle: string
  price: string
  period: string
  badge?: string
  description: string
  features: PlanFeature[]
  popular?: boolean
}

export const POLAR_CONFIG = {
  // Polar checkout URL for the PRO subscription (set in .env as VITE_POLAR_CHECKOUT_URL)
  checkoutUrl:
    import.meta.env.VITE_POLAR_CHECKOUT_URL || '',
  // Polar customer portal URL (set in .env as VITE_POLAR_PORTAL_URL or defaults to polar.sh)
  portalUrl:
    import.meta.env.VITE_POLAR_PORTAL_URL || 'https://polar.sh/customer-portal',
}

export const PLANS: PlanConfig[] = [
  {
    id: 'FREE',
    name: 'Éveil',
    subtitle: 'Gratuit pour toujours',
    price: '0€',
    period: '/ mois',
    description:
      'Pour explorer vos fondations psychologiques et initier votre démarche d’introspection.',
    features: [
      { text: '10 messages quotidiens avec le Soul Coach' },
      { text: 'Test de personnalité MBTI & profil psychologique complet' },
      { text: 'Journal de bord introspectif' },
      { text: 'Cartographie des dimensions cognitives' },
    ],
  },
  {
    id: 'PRO',
    name: 'Le Sanctuaire',
    subtitle: 'Guidance approfondie & illimitée',
    price: '9,99€',
    period: '/ mois',
    badge: 'Recommandé',
    popular: true,
    description:
      'L’expérience introspective ultime avec mémoire persistante, synthèse continue et calibrage élevé.',
    features: [
      { text: '50 interactions quotidiennes avec votre Soul Coach', highlight: true },
      { text: 'Mémoire adaptative approfondie (faits clés & analyse continue)', highlight: true },
      { text: 'Synthèse psychologique dynamique en temps réel' },
      { text: 'Calibrage cognitif continu et sans restriction' },
      { text: 'Accès prioritaire à toutes les futures fonctionnalités' },
      { text: 'Sans engagement • Annulation en 1 clic à tout moment' },
    ],
  },
]

/**
 * Builds the Polar checkout URL with customer email and user ID in metadata.
 * The webhook backend in `backend/src/polar/polar.service.ts` looks for `data.metadata.userId`
 * to immediately activate the user's PRO plan upon payment.
 */
export function buildPolarCheckoutUrl({
  userId,
  userEmail,
  returnUrl,
}: {
  userId?: string
  userEmail?: string
  returnUrl?: string
}): string {
  const base = POLAR_CONFIG.checkoutUrl.trim()
  if (!base) return ''

  try {
    const url = new URL(base)

    if (userEmail) {
      url.searchParams.set('customer_email', userEmail)
    }

    if (userId) {
      // Polar supports metadata parameters in multiple formats depending on checkout config
      url.searchParams.set('metadata[userId]', userId)
      url.searchParams.set('userId', userId)
    }

    if (returnUrl) {
      url.searchParams.set('success_url', returnUrl)
      url.searchParams.set('return_url', returnUrl)
    }

    return url.toString()
  } catch (e) {
    // If base is a relative or custom link
    const params = new URLSearchParams()
    if (userEmail) params.set('customer_email', userEmail)
    if (userId) {
      params.set('metadata[userId]', userId)
      params.set('userId', userId)
    }
    if (returnUrl) {
      params.set('success_url', returnUrl)
      params.set('return_url', returnUrl)
    }
    const separator = base.includes('?') ? '&' : '?'
    return `${base}${separator}${params.toString()}`
  }
}
