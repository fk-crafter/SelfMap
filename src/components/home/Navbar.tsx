import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-white/5 bg-[#001809]/60 px-6 backdrop-blur-xl md:px-12"
    >
      <Link
        to="/"
        className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9c349]/10 text-[#e9c349]">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-serif text-2xl font-normal tracking-tight text-[#e9c349]">
          SoulType
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm font-medium text-[#c8c5d0] transition-colors hover:text-[#e9c349]"
        >
          Log in
        </Link>
        <Button
          asChild
          className="h-10 rounded-full bg-[#e9c349] px-6 text-sm font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-all hover:bg-[#e9c349]/90 active:scale-95"
        >
          <Link to="/test">Start Journey</Link>
        </Button>
      </div>
    </motion.nav>
  )
}
