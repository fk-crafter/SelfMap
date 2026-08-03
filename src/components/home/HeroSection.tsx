import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'

export function HeroSection({ usersHelped }: { usersHelped: number }) {
  return (
    <section className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 pt-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1.5 text-sm font-medium text-[#e9c349]"
      >
        <Sparkles className="h-4 w-4" />
        <span>AI-Powered Personality Assessment</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="font-serif text-5xl font-normal tracking-tight text-[#c9ebd0] sm:text-7xl"
      >
        The AI <span className="text-[#e9c349]">Soul Coach</span>
        <br />
        That Evolves With You.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-lg leading-relaxed text-[#c8c5d0] sm:text-xl"
      >
        Go beyond traditional MBTI tests with a living psychological profile.
        Map your cognitive functions, engage in daily introspection, and receive
        hyper-personalized guidance tailored to your true archetype.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 sm:flex-row"
      >
        <Button
          asChild
          className="h-14 rounded-full bg-[#e9c349] px-8 text-lg font-bold text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.3)] transition-transform hover:scale-105 hover:bg-[#e9c349]/90 active:scale-95"
        >
          <Link to="/test">
            Discover Your Archetype <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3 pt-4"
      >
        <div className="flex -space-x-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80"
            alt="User"
            className="h-10 w-10 rounded-full border-2 border-[#001809] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces&q=80"
            alt="User"
            className="h-10 w-10 rounded-full border-2 border-[#001809] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80"
            alt="User"
            className="h-10 w-10 rounded-full border-2 border-[#001809] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80"
            alt="User"
            className="h-10 w-10 rounded-full border-2 border-[#001809] object-cover"
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#001809] bg-[#12301e] text-xs font-bold text-[#c9ebd0]">
            +
          </div>
        </div>
        <p className="text-sm font-medium text-[#c8c5d0]">
          Join <span className="text-[#e9c349]">{usersHelped}+</span>{' '}
          individuals on their journey to self-mastery
        </p>
      </motion.div>
    </section>
  )
}
