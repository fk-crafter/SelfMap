import { create } from 'zustand'

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
  createdAt: Date
  updatedAt: Date
}

interface UserState {
  profile: UserProfile | null
  user: AuthUser | null
  isAuthenticated: boolean
  setProfile: (profile: UserProfile) => void
  setUser: (user: AuthUser | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  user: null,
  isAuthenticated: false,
  setProfile: (profile) => set({ profile }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}))
