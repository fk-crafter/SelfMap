import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Compass,
  ArrowRight,
  X,
  RefreshCw,
  Crown,
  Lock,
  Loader2,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

export type WeeklySynthesisData = {
  id?: string
  weekNumber: number
  year: number
  climate: string
  themes: string[]
  analysis: string
  intention: string
  isPro: boolean
  createdAt?: string
}

export function WeeklySynthesisCard({ user }: { user: any }) {
  const { t, i18n } = useTranslation()
  const [synthesis, setSynthesis] = useState<WeeklySynthesisData | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const isPro = user?.plan === 'PRO' || user?.plan === 'BETA'

  const fetchSynthesis = async (isManualRefresh = false) => {
    if (!user?.id) return
    if (isManualRefresh) setIsRefreshing(true)
    else setIsLoading(true)

    try {
      const endpoint = isManualRefresh
        ? '/api/synthesis/generate'
        : '/api/synthesis/current'

      const res = await window.fetch(endpoint, {
        method: isManualRefresh ? 'POST' : 'GET',
        credentials: 'include',
        headers: {
          'x-user-id': user.id,
          'x-user-lang': i18n.language || 'fr',
        },
      })

      if (res.ok) {
        const data = await res.json()
        setSynthesis(data)
        if (isManualRefresh) {
          toast.success(t('synthesis.refreshedSuccess', 'Synthèse mise à jour !'))
        }
      }
    } catch (err) {
      console.error('Failed to load weekly synthesis:', err)
      if (isManualRefresh) {
        toast.error(t('synthesis.loadError'))
      }
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchSynthesis()
  }, [user?.id, i18n.language])

  return (
    <>
      <Card className="group relative overflow-hidden border border-[#e9c349]/20 bg-linear-to-b from-[#063018] via-[#022110] to-[#001809] p-6 shadow-xl backdrop-blur-xl rounded-[2rem] transition-all hover:border-[#e9c349]/40">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 h-36 w-36 rounded-full bg-[#e9c349]/5 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e9c349]/30 bg-[#e9c349]/10 text-[#e9c349]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349]">
                {t('synthesis.cardTitle')}
              </span>
              <h3 className="font-serif text-lg font-medium text-[#c9ebd0] leading-snug">
                {synthesis?.climate || t('synthesis.discoveringClimate', 'Climat de la Semaine')}
              </h3>
            </div>
          </div>
          {synthesis?.weekNumber && (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-[#c8c5d0]">
              Semaine {synthesis.weekNumber}
            </span>
          )}
        </div>

        {synthesis?.themes && synthesis.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {synthesis.themes.slice(0, 3).map((theme, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#c8c5d0]/90"
              >
                #{theme}
              </span>
            ))}
          </div>
        )}

        {synthesis?.intention && (
          <div className="mb-5 rounded-xl border border-[#e9c349]/15 bg-[#e9c349]/5 p-3.5 text-xs italic text-[#c9ebd0]/90 leading-relaxed flex items-start gap-2.5">
            <Compass className="h-4 w-4 shrink-0 text-[#e9c349] mt-0.5" />
            <span>« {synthesis.intention} »</span>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(true)}
          className="w-full rounded-full bg-[#e9c349] h-11 text-[#001809] font-bold text-xs tracking-wider hover:bg-[#e9c349]/90 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {t('synthesis.viewSynthesis')} <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2rem] border border-white/10 bg-[#021f0d] text-[#c9ebd0] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e9c349]/15 text-[#e9c349]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-[#c9ebd0]">
                      {t('synthesis.modalTitle')}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#c8c5d0]/70 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {synthesis
                          ? t('synthesis.weekNumber', {
                              week: synthesis.weekNumber,
                              year: synthesis.year,
                            })
                          : '...'}
                      </span>
                      {isPro ? (
                        <span className="rounded-full bg-[#e9c349]/20 border border-[#e9c349]/40 px-2 py-0.5 text-[10px] font-bold text-[#e9c349] flex items-center gap-1">
                          <Crown className="h-3 w-3" /> PRO
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-[#c8c5d0]">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-[#c8c5d0] hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
                    <p className="text-xs text-[#c8c5d0]">
                      {t('synthesis.refreshing')}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Climat Section */}
                    <div className="rounded-2xl border border-[#e9c349]/20 bg-linear-to-r from-[#e9c349]/10 via-[rgba(197,192,254,0.03)] to-transparent p-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349] block mb-1">
                        {t('synthesis.climateTitle')}
                      </span>
                      <h3 className="font-serif text-2xl text-[#e9c349]">
                        {synthesis?.climate}
                      </h3>
                    </div>

                    {/* Thèmes Observés */}
                    {synthesis?.themes && synthesis.themes.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8c5d0]/70 mb-2.5">
                          {t('synthesis.themesTitle')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {synthesis.themes.map((theme, i) => (
                            <span
                              key={i}
                              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#c9ebd0] flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#e9c349]" />
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Intention Section */}
                    {synthesis?.intention && (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Compass className="h-4 w-4 text-[#e9c349]" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#e9c349]">
                            {t('synthesis.intentionTitle')}
                          </h4>
                        </div>
                        <p className="text-sm italic text-[#c9ebd0] leading-relaxed">
                          « {synthesis.intention} »
                        </p>
                      </div>
                    )}

                    {/* Analyse Psychologique */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8c5d0]/70">
                        {isPro
                          ? t('synthesis.proAnalysisUnlocked')
                          : t('synthesis.freeAnalysisTitle')}
                      </h4>

                      <div className="prose prose-invert max-w-none text-sm leading-relaxed text-[#c8c5d0] whitespace-pre-line bg-black/20 p-5 rounded-2xl border border-white/5">
                        {synthesis?.analysis}
                      </div>

                      {/* PRO Upgrade Card for FREE users */}
                      {!isPro && (
                        <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#e9c349]/30 bg-linear-to-b from-[#e9c349]/15 to-[#001809] p-5 backdrop-blur-xl">
                          <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-[#e9c349]/20 p-2 text-[#e9c349] shrink-0">
                              <Lock className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-serif text-base font-bold text-[#e9c349] mb-1">
                                {t('synthesis.proAnalysisUnlocked')}
                              </h5>
                              <p className="text-xs text-[#c8c5d0]/80 leading-relaxed mb-4">
                                {t('synthesis.proLockedNotice')}
                              </p>
                              <Button
                                asChild
                                className="rounded-full bg-[#e9c349] px-5 py-2 text-xs font-bold text-[#001809] hover:bg-[#e9c349]/90"
                              >
                                <Link to="/subscription">
                                  {t('synthesis.unlockPro')}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-white/10 p-4 px-6 bg-black/20">
                <Button
                  variant="ghost"
                  onClick={() => fetchSynthesis(true)}
                  disabled={isRefreshing || isLoading}
                  className="rounded-full text-xs text-[#c8c5d0] hover:text-[#e9c349] hover:bg-white/5 flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
                  />
                  {isRefreshing
                    ? t('synthesis.refreshing')
                    : t('synthesis.refreshSynthesis')}
                </Button>

                <Button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/10 px-5 py-1.5 text-xs font-medium text-[#c8c5d0] hover:bg-white/20"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
