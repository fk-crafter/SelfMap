import { create } from 'zustand'

interface UserProfile {
  name: string
  type: string
  insight: string
  avatarSeed: string
}

interface UserState {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  clearProfile: () => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile }),

  clearProfile: () => set({ profile: null }),
}))
