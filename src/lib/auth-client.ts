import { createAuthClient } from 'better-auth/react'

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
})
