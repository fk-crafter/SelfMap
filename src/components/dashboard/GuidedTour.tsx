import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp, ArrowDown, Sparkles, ChevronRight, ChevronLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

type TourStep = {
  target: string
  titleKey: string
  descKey: string
  borderRadius?: number
}

const TOUR_STEPS: TourStep[] = [
  {
    target: 'coach-card',
    titleKey: 'tour.step1Title',
    descKey: 'tour.step1Desc',
    borderRadius: 32,
  },
  {
    target: 'weekly-synthesis',
    titleKey: 'tour.step2Title',
    descKey: 'tour.step2Desc',
    borderRadius: 32,
  },
  {
    target: 'quick-actions',
    titleKey: 'tour.step3Title',
    descKey: 'tour.step3Desc',
    borderRadius: 24,
  },
  {
    target: 'bottom-nav',
    titleKey: 'tour.step4Title',
    descKey: 'tour.step4Desc',
    borderRadius: 24,
  },
]

type Rect = {
  top: number
  left: number
  width: number
  height: number
  bottom: number
}

export function GuidedTour({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)
  const [viewportH, setViewportH] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800,
  )

  const step = TOUR_STEPS[currentStep]

  const updateRect = useCallback(() => {
    if (typeof window === 'undefined') return
    setViewportH(window.innerHeight)
    const el = document.querySelector(`[data-tour="${step.target}"]`)
    if (el) {
      const r = el.getBoundingClientRect()
      setRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        bottom: r.bottom,
      })
    }
  }, [step.target])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = document.querySelector(`[data-tour="${step.target}"]`)
    if (el && step.target !== 'bottom-nav') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    updateRect()
    const interval = setInterval(updateRect, 50)
    const timeout = setTimeout(() => clearInterval(interval), 700)

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, true)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect, true)
    }
  }, [currentStep, step.target, updateRect])

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const padding = step.target === 'bottom-nav' ? 4 : 8
  const spotTop = rect ? rect.top - padding : viewportH / 2 - 60
  const spotLeft = rect ? rect.left - padding : 24
  const spotWidth = rect ? rect.width + padding * 2 : 300
  const spotHeight = rect ? rect.height + padding * 2 : 120

  const spaceBelow = rect ? viewportH - (rect.bottom + padding) : 300
  const spaceAbove = rect ? rect.top - padding : 300
  const placeBelow = spaceBelow >= 220 || spaceBelow >= spaceAbove

  const cardHeightEstimate = 215
  let tooltipTop = 24
  if (rect) {
    if (placeBelow) {
      tooltipTop = Math.min(
        spotTop + spotHeight + 18,
        viewportH - cardHeightEstimate - 16,
      )
    } else {
      tooltipTop = Math.max(16, spotTop - cardHeightEstimate - 18)
    }
  }

  return (
    <div className="fixed inset-0 z-150 overflow-hidden select-none">
      <div
        className="absolute inset-0"
        onClick={handleNext}
      />

      {rect && (
        <motion.div
          initial={false}
          animate={{
            top: spotTop,
            left: spotLeft,
            width: spotWidth,
            height: spotHeight,
            borderRadius: step.borderRadius ?? 24,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{
            boxShadow:
              '0 0 0 9999px rgba(0, 12, 5, 0.84), 0 0 35px rgba(233, 195, 73, 0.45)',
          }}
          className="pointer-events-none fixed z-150 border-2 border-[#e9c349]"
        >
          <span className="absolute -inset-1.5 animate-pulse rounded-[inherit] border border-[#e9c349]/40" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: placeBelow ? 12 : -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ top: tooltipTop }}
          className="fixed left-4 right-4 z-160 mx-auto max-w-md"
        >
          {placeBelow && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2 flex flex-col items-center justify-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e9c349] bg-[#e9c349]/20 text-[#e9c349] shadow-[0_0_20px_rgba(233,195,73,0.6)]">
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </div>
            </motion.div>
          )}

          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#e9c349]/40 bg-[#032110]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(233,195,73,0.15)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#e9c349]/15 blur-2xl" />

            <div className="mb-2.5 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#e9c349]">
                <Sparkles className="h-3 w-3" />
                {t('tour.stepCounter', {
                  current: currentStep + 1,
                  total: TOUR_STEPS.length,
                })}
              </div>

              <button
                onClick={onComplete}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-[#c8c5d0]/60 transition-colors hover:bg-white/5 hover:text-[#c9ebd0]"
              >
                <span>{t('tour.skip')}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <h3 className="mb-1.5 font-serif text-xl font-normal text-[#e9c349]">
              {t(step.titleKey)}
            </h3>

            <p className="mb-5 text-xs sm:text-sm leading-relaxed text-[#c9ebd0]/90">
              {t(step.descKey)}
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? 'w-6 bg-[#e9c349]'
                        : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handlePrev}
                    className="h-9 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-semibold text-[#c9ebd0] hover:bg-white/10"
                  >
                    <ChevronLeft className="mr-1 h-3.5 w-3.5" />
                    {t('tour.prev')}
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleNext}
                  className="h-9 rounded-full bg-[#e9c349] px-5 text-xs font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.3)] hover:bg-[#f6d773] active:scale-95"
                >
                  {currentStep === TOUR_STEPS.length - 1
                    ? t('tour.finish')
                    : t('tour.next')}
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {!placeBelow && (
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-2 flex flex-col items-center justify-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e9c349] bg-[#e9c349]/20 text-[#e9c349] shadow-[0_0_20px_rgba(233,195,73,0.6)]">
                <ArrowDown className="h-4 w-4 stroke-[2.5]" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
