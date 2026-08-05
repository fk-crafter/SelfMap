import { Link, useNavigate } from '@tanstack/react-router'
import { User as UserIcon, Settings, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { authClient } from '@/lib/auth-client'

type DashboardHeaderProps = {
  user: {
    avatarSeed?: string | null
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#c9ebd0]/5 bg-[#001809]/80 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <h1 className="font-serif text-2xl font-normal tracking-tight text-[#e9c349]">
          SoulType
        </h1>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#e9c349]/20 bg-[#e9c349]/10 text-[#e9c349] shadow-sm transition-transform hover:scale-105 active:scale-95"
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
          <div className="absolute right-0 top-12 z-50 flex w-48 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#032110] shadow-2xl backdrop-blur-xl">
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] transition-colors hover:bg-white/5"
            >
              <UserIcon className="h-4 w-4 text-[#e9c349]/70" />
              My Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#c9ebd0] transition-colors hover:bg-white/5"
            >
              <Settings className="h-4 w-4 text-[#e9c349]/70" />
              Settings
            </Link>
            <div className="h-px w-full bg-white/10" />
            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#ffb4ab] transition-colors hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
