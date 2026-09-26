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
  yearlyPrice?: string
  yearlyPeriod?: string
  yearlySubtitle?: string
  badge?: string
  yearlyBadge?: string
  description: string
  features: PlanFeature[]
  popular?: boolean
}

export const POLAR_CONFIG = {
  checkoutUrl: import.meta.env.VITE_POLAR_CHECKOUT_URL || '',
  yearlyCheckoutUrl:
    import.meta.env.VITE_POLAR_YEARLY_CHECKOUT_URL ||
    import.meta.env.VITE_POLAR_CHECKOUT_URL ||
    '',
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
    yearlyPrice: '$0',
    yearlyPeriod: '/ year',
    yearlySubtitle: 'Free forever',
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
    price: '$15',
    period: '/ month',
    yearlyPrice: '$12',
    yearlyPeriod: '/ month',
    yearlySubtitle: 'Billed $144 annually (Save 20% • 2 months free)',
    badge: 'Recommended',
    yearlyBadge: 'Save 20%',
    popular: true,
    description:
      'The ultimate introspective experience with persistent memory, continuous synthesis, and advanced calibration.',
    features: [
      { text: '50 daily interactions with your Soul Coach', highlight: true },
      {
        text: 'Deep adaptive memory (key facts & continuous analysis)',
        highlight: true,
      },
      { text: 'Real-time dynamic psychological synthesis' },
      { text: 'Continuous and unrestricted cognitive calibration' },
      { text: 'Priority access to all upcoming features' },
      { text: 'No commitment • Cancel in 1 click anytime' },
    ],
  },
]

export function buildPolarCheckoutUrl({
  userId,
  userEmail,
  returnUrl,
  interval = 'month',
  customUrl,
}: {
  userId?: string
  userEmail?: string
  returnUrl?: string
  interval?: 'month' | 'year'
  customUrl?: string
}): string {
  const base = (
    customUrl ||
    (interval === 'year' && POLAR_CONFIG.yearlyCheckoutUrl
      ? POLAR_CONFIG.yearlyCheckoutUrl
      : POLAR_CONFIG.checkoutUrl)
  ).trim()
  if (!base) return ''

  try {
    const url = new URL(base)

    if (userEmail) {
      url.searchParams.set('customer_email', userEmail)
    }

    if (userId) {
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
