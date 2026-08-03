import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'

export function HeroSection({ usersHelped }: { usersHelped: number }) {
  return (
    <section className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 pt-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1.5 font-sans text-sm font-medium transition-colors hover:bg-[#e9c349]/20">
          <AnimatedShinyText className="inline-flex items-center justify-center gap-2 text-[#e9c349] transition ease-out hover:text-[#f6d773] hover:duration-300 hover:[text-shadow:0_0_8px_rgba(233,195,73,0.8)]">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Personality Assessment</span>
          </AnimatedShinyText>
        </div>
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
        className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-[#c8c5d0] sm:text-xl"
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
          className="group relative h-12 overflow-hidden rounded-full bg-[#e9c349] px-8 font-sans text-base font-semibold text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] transition-all duration-500 hover:bg-[#f6d773] hover:shadow-[0_0_40px_rgba(233,195,73,0.6)] active:scale-[0.98]"
        >
          <Link to="/test">
            <span className="relative z-10 flex items-center">
              Discover Your Archetype
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
              <div className="h-full w-[200%] translate-x-[-150%] skew-x-[-15deg] bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
            </div>
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3 pt-4 font-sans"
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
