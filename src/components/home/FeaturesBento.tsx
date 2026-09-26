import { motion } from 'motion/react'
import {
  MessageSquare,
  Target,
  BookOpen,
  UserCircle,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export function FeaturesBento() {
  const { t } = useTranslation()

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
          {t('features.heading')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#c8c5d0]">
          {t('features.subheading')}
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
                {t('features.chatTitle')}
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#c8c5d0]/70">
                {t('features.chatDesc')}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 opacity-50 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0">
              <div className="self-end rounded-2xl rounded-tr-sm bg-[#e9c349]/20 px-4 py-2 text-xs text-[#e9c349]">
                {t('features.chatExampleUser')}
              </div>
              <div className="self-start rounded-2xl rounded-tl-sm bg-white/5 px-4 py-2 text-xs text-[#c9ebd0]">
                {t('features.chatExampleAi')}
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
                {t('features.avatarTitle')}
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                {t('features.avatarDesc')}
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
                {t('features.scoreTitle')}
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                {t('features.scoreDesc')}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-end gap-1">
                <span className="font-serif text-5xl leading-none text-[#e9c349]">
                  87
                </span>
                <span className="font-serif text-xl leading-none text-[#e9c349]/60 mb-1">
                  %
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e9c349]/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '87%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[#e9c349] shadow-[0_0_10px_rgba(233,195,73,0.5)]"
                />
              </div>
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
                {t('features.journalTitle')}
              </h3>
              <p className="mt-2 text-sm text-[#c8c5d0]/70">
                {t('features.journalDesc')}
              </p>
            </div>

            <div className="mt-8 relative flex h-24 w-full items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-16 w-16 rounded-full bg-[#c9ebd0]/0 blur-xl transition-all duration-700 ease-out group-hover:scale-150 group-hover:bg-[#c9ebd0]/15" />
              </div>

              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 flex items-center justify-center text-[#c9ebd0]/30 transition-all duration-500 group-hover:text-[#c9ebd0]/90 group-hover:drop-shadow-[0_0_15px_rgba(201,235,208,0.4)]"
              >
                <BookOpen className="h-14 w-14 stroke-1" />

                <motion.div
                  className="absolute -right-3 -top-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 text-[#e9c349]"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
