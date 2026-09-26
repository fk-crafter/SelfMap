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
    name: 'Awakening',
    subtitle: 'Free forever',
    price: '$0',
    period: '/ month',
    description:
      'Explore your psychological foundations and initiate your introspective journey.',
    features: [
      { text: '10 daily messages with Soul Coach' },
      { text: 'Full MBTI personality test & complete psychological profile' },
      { text: 'Introspective reflection journal' },
      { text: 'Cognitive dimensions mapping' },
    ],
  },
  {
    id: 'PRO',
    name: 'The Sanctuary',
    subtitle: 'Deep & continuous guidance',
    price: '$9.99',
    period: '/ month',
    badge: 'Recommended',
    popular: true,
    description:
      'The ultimate introspective experience with persistent memory, continuous synthesis, and advanced calibration.',
    features: [
      { text: '50 daily interactions with your Soul Coach', highlight: true },
      { text: 'Deep adaptive memory (key facts & continuous analysis)', highlight: true },
      { text: 'Real-time dynamic psychological synthesis' },
      { text: 'Continuous and unrestricted cognitive calibration' },
      { text: 'Priority access to all upcoming features' },
      { text: 'No commitment • Cancel in 1 click anytime' },
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
      url.searchParams.set('checkout[metadata][userId]', userId)
      url.searchParams.set('customer_metadata[userId]', userId)
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
