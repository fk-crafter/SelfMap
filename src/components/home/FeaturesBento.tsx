import { motion } from 'motion/react'
import { MessageSquare, Target, BookOpen, UserCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function FeaturesBento() {
  return (
    <section className="relative z-10 mt-32 flex w-full max-w-6xl flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-16 text-center"
      >
        <h2 className="font-serif text-3xl font-normal text-[#c9ebd0] sm:text-4xl md:text-5xl">
          Your mind, mapped and reflected.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          A seamless ecosystem designed to capture your psychological essence
          and mirror it back to you.
        </p>
      </motion.div>

      <div className="grid w-full auto-rows-85 grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="md:col-span-2"
        >
          <Card className="group relative flex h-full flex-col justify-between overflow-hidden border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 backdrop-blur-xl md:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c5c0fe] opacity-10 blur-[60px] transition-opacity group-hover:opacity-20" />
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#c5c0fe]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-[#c9ebd0]">
                Conversational Coaching
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#c8c5d0]/70">
                Engage in deep, meaningful dialogue with an AI that understands
                your unique cognitive functions and adapts its tone to your
                current emotional state.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 opacity-50 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0">
              <div className="self-end rounded-2xl rounded-tr-sm bg-[#e9c349]/20 px-4 py-2 text-xs text-[#e9c349]">
                I feel like I'm stuck in a loop today.
              </div>
              <div className="self-start rounded-2xl rounded-tl-sm bg-white/5 px-4 py-2 text-xs text-[#c9ebd0]">
                Your Ni (Introverted Intuition) might be over-analyzing. Let's
                ground you.
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="md:row-span-2"
        >
          <Card className="group relative flex h-full flex-col overflow-hidden border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 backdrop-blur-xl md:p-8">
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#001809]">
              <div className="relative flex h-64 w-64 items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1, 2.5, 2.5, 1],
                    opacity: [1, 1, 0, 0, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0, 0.4, 0.5, 0.9, 1],
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="absolute h-48 w-48 rounded-full border border-white/10 border-t-white/40 animate-[spin_3s_linear_infinite]" />
                  <div className="absolute h-36 w-36 rounded-full border border-[#c5c0fe]/20 border-b-[#c5c0fe]/60 animate-[spin_2s_linear_infinite_reverse]" />
                  <div className="absolute h-24 w-24 rounded-full border border-[#e9c349]/10 border-l-[#e9c349]/80 animate-[spin_1.5s_linear_infinite]" />
                  <div className="absolute h-12 w-12 rounded-full bg-[#e9c349]/20 blur-md animate-pulse" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [0.3, 0.3, 1, 1, 0.3],
                    opacity: [0, 0, 1, 1, 0],
                    filter: [
                      'blur(15px)',
                      'blur(15px)',
                      'blur(0px)',
                      'blur(0px)',
                      'blur(15px)',
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0, 0.4, 0.5, 0.9, 1],
                    ease: 'easeInOut',
                  }}
                  className="absolute flex h-32 w-32 items-center justify-center rounded-full border border-[#e9c349]/40 bg-[rgba(233,195,73,0.15)] text-[#e9c349] shadow-[0_0_40px_rgba(233,195,73,0.3)] backdrop-blur-md"
                >
                  <UserCircle className="h-16 w-16 stroke-[1.2]" />
                </motion.div>
              </div>
            </div>
            <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-transparent to-[#001809]/90" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                <UserCircle className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-[#c9ebd0]">
                Generative 3D Avatar
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                A visual representation of your soul coach, generated
                dynamically based on your psychological archetype and energy.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <Card className="group relative flex h-full flex-col justify-between overflow-hidden border border-[#e9c349]/20 bg-[rgba(233,195,73,0.02)] p-6 transition-colors hover:bg-[rgba(233,195,73,0.05)] backdrop-blur-xl md:p-8">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9c349]/10 text-[#e9c349]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-[#e9c349]">
                Dynamic Calibration
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                The more you interact, the higher your synchronization score
                grows.
              </p>
            </div>
            <div className="text-5xl font-serif text-[#e9c349] opacity-80">
              87%
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <Card className="group relative flex h-full flex-col justify-between overflow-hidden border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 backdrop-blur-xl md:p-8">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#c9ebd0]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-[#c9ebd0]">
                Inner Journal
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                Write your thoughts freely. The AI silently analyzes your
                entries to refine your cognitive mapping.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
