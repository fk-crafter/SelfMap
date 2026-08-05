import { Link, useNavigate } from '@tanstack/react-router'
import { Menu, User as UserIcon, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

type DashboardHeaderProps = {
  user: {
    avatarSeed?: string | null
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/login' })
        },
      },
    })
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#001809]/80 px-6 py-5 backdrop-blur-xl border-b border-[#c9ebd0]/5">
      <div className="flex items-center gap-4">
        <button className="text-[#c9ebd0] hover:text-[#e9c349] transition-colors">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="font-serif text-2xl font-normal tracking-tight text-[#e9c349]">
          SoulType
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 overflow-hidden rounded-full border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer items-center justify-center text-[#e9c349]"
        >
          {user.avatarSeed ? (
            <img
              src={user.avatarSeed}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIcon className="h-5 w-5" />
          )}
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-12 z-50 flex w-48 flex-col overflow-hidden rounded-2xl bg-[#032110] shadow-2xl border border-white/10 backdrop-blur-xl">
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] hover:bg-white/5 transition-colors"
              >
                <UserIcon className="h-4 w-4 text-[#e9c349]/70" />
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] hover:bg-white/5 transition-colors"
              >
                <Settings className="h-4 w-4 text-[#e9c349]/70" />
                Settings
              </Link>
              <div className="h-px w-full bg-white/10" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#ffb4ab] hover:bg-white/5 transition-colors text-left w-full cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
