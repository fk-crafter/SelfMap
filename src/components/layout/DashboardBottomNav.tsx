import { Link } from '@tanstack/react-router'
import { Home, MessageSquare, Search, User } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/discover', label: 'Discover', icon: Search },
  { to: '/profile', label: 'Profile', icon: User },
]

export function DashboardBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-20 items-center justify-around border-t border-white/5 bg-[#001206]/95 px-4 pb-4 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{
              className: 'text-[#e9c349]',
            }}
            inactiveProps={{
              className: 'text-[#c8c5d0]/50 hover:text-[#e9c349]/80',
            }}
            className="flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
