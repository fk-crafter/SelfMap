import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(0, 24, 9, 0.95)'
            : 'rgba(0, 24, 9, 0.6)',
          borderRadius: isScrolled ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 30,
          mass: 0.5,
        }}
        className={`pointer-events-auto flex items-center justify-between backdrop-blur-xl ${
          isScrolled
            ? 'mt-4 h-16 w-[calc(100%-2rem)] max-w-5xl border border-white/10 px-3 sm:px-6 shadow-2xl'
            : 'mt-0 h-20 w-full max-w-none border-b border-white/5 px-4 md:px-12'
        }`}
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="SoulType"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="whitespace-nowrap font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#e9c349]">
            SoulType
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            to="/login"
            className="whitespace-nowrap text-sm font-medium text-[#c8c5d0] transition-colors hover:text-[#e9c349]"
          >
            Log in
          </Link>
          <Button
            asChild
            className="h-9 sm:h-10 whitespace-nowrap rounded-full bg-[#e9c349] px-4 sm:px-6 text-sm font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-all hover:bg-[#e9c349]/90 active:scale-95"
          >
            <Link to="/test">Start Journey</Link>
          </Button>
        </div>
      </motion.nav>
    </div>
  )
}
