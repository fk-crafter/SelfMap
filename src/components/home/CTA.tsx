import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative z-10 mt-32 mb-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-[#e9c349]/20 bg-[rgba(233,195,73,0.02)] p-12 backdrop-blur-xl md:p-20"
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#e9c349]/5 to-transparent" />
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e9c349] opacity-20 blur-[100px]" />

        <h2 className="relative z-10 font-serif text-4xl font-normal text-[#c9ebd0] md:text-6xl">
          Ready to meet your <span className="text-[#e9c349]">true self</span>?
        </h2>
        <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg text-[#c8c5d0]">
          The sanctuary is open. Take the assessment and summon the AI coach
          that will guide your evolution.
        </p>
        <div className="relative z-10 mt-10">
          <Button
            asChild
            className="h-14 rounded-full bg-[#e9c349] px-10 text-lg font-bold text-[#001809] shadow-[0_0_30px_rgba(233,195,73,0.3)] transition-transform hover:scale-105 hover:bg-[#e9c349]/90 active:scale-95"
          >
            <Link to="/test">
              Enter the Sanctuary <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
