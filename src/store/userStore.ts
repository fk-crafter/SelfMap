import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserScores {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}

export interface UserProfile {
  name: string
  type: string
  insight: string
  avatarSeed: string
  scores: UserScores
}

export interface AuthUser {
  id: string
  email: string
  name: string
  createdAt?: Date | string
  updatedAt?: Date | string
  type?: string | null
  insight?: string | null
  avatarSeed?: string | null
  scores?: string | null
  gender?: string | null
  isAdmin?: boolean
  plan?: string | null
}

interface UserState {
  profile: UserProfile | null
  user: AuthUser | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  setProfile: (profile: UserProfile) => void
  setUser: (user: AuthUser | null) => void
  logout: () => void
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setProfile: (profile) => set({ profile }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.removeItem('soultype-user-session')
            window.sessionStorage.clear()
          } catch (e) {
            console.error('Error clearing storage:', e)
          }
        }
        set({ user: null, isAuthenticated: false, profile: null })
      },
    }),
    {
      name: 'soultype-user-session',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : noopStorage,
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
