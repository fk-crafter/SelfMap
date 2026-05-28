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

interface UserState {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
