import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/auth`
  }
  return 'http://localhost:3000/api/auth'
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    inferAdditionalFields({
      user: {
        type: { type: 'string', required: false },
        gender: { type: 'string', required: false },
        insight: { type: 'string', required: false },
        avatarSeed: { type: 'string', required: false },
        scores: { type: 'string', required: false },
        plan: { type: 'string', required: false },
        isAdmin: { type: 'boolean', required: false },
        cancelAtPeriodEnd: { type: 'boolean', required: false },
        currentPeriodEnd: { type: 'date', required: false },
        subscriptionStatus: { type: 'string', required: false },
      },
    }),
  ],
})
