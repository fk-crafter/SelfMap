import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Sparkles,
  ArrowLeft,
  Crown,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Loader2,
  Lock,
  Zap,
  Calendar,
  CheckCircle2,
  Circle,
  MessageSquare,
  Brain,
  BarChart3,
  Compass,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import {
  buildPolarCheckoutUrl,
  POLAR_CONFIG,
  getPolarPortalUrl,
} from '@/lib/polar'
import { toast } from 'sonner'
import { DashboardBottomNav } from '@/components/layout/DashboardBottomNav'
import { useTranslation } from 'react-i18next'

type SubscriptionSearch = {
  success?: boolean
  canceled?: boolean
}

export const Route = createFileRoute('/subscription')({
  validateSearch: (search: Record<string, unknown>): SubscriptionSearch => ({
    success:
      search.success === 'true' || search.success === true ? true : undefined,
    canceled:
      search.canceled === 'true' || search.canceled === true ? true : undefined,
  }),
  component: SubscriptionPage,
})

const isAvatarGenerated = (seed?: string | null): boolean => {
  if (!seed) return false
  return (
    seed.startsWith('http://') ||
    seed.startsWith('https://') ||
    seed.startsWith('/')
  )
}

function SubscriptionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search = Route.useSearch()
  const { data: sessionData, refetch } = authClient.useSession()
  const storedUser = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isYearly, setIsYearly] = useState(true)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [customCheckoutUrl, setCustomCheckoutUrl] = useState('')

  const FAQS = [
    {
      question: t('subscription.faq1Q'),
      answer: t('subscription.faq1A'),
    },
    {
      question: t('subscription.faq2Q'),
      answer: t('subscription.faq2A'),
    },
    {
      question: t('subscription.faq3Q'),
      answer: t('subscription.faq3A'),
    },
    {
      question: t('subscription.faq4Q'),
      answer: t('subscription.faq4A'),
    },
    {
      question: t('subscription.faq5Q'),
      answer: t('subscription.faq5A'),
    },
  ]

  const user = sessionData?.user || storedUser

  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    plan?: string | null
    subscriptionStatus?: string | null
    cancelAtPeriodEnd?: boolean
    currentPeriodEnd?: string | null
  } | null>(null)

  const effectivePlan = (
    subscriptionDetails?.plan ||
    user?.plan ||
    'FREE'
  ).toUpperCase()
  const effectiveSubStatus = (
    subscriptionDetails?.subscriptionStatus ||
    user?.subscriptionStatus ||
    ''
  ).toLowerCase()
  const isPro =
    effectivePlan === 'PRO' ||
    effectivePlan === 'BETA' ||
    effectiveSubStatus === 'active'

  useEffect(() => {
    if (search.success) {
      toast.success(t('subscription.successToast'), {
        duration: 5000,
      })
      void refetch()
      authClient.getSession().then((res) => {
        if (res.data?.user) {
          setUser(res.data.user)
        }
      })
    } else if (search.canceled) {
      toast.info(t('subscription.cancelToast'))
    }
  }, [search.success, search.canceled, refetch, setUser, t])

  useEffect(() => {
    if (!user) return
    const fetchSub = async () => {
      try {
        const subUrl = import.meta.env.PROD
          ? '/users/me/subscription'
          : 'https://selfmap-bck.onrender.com/users/me/subscription'
        const res = await window.fetch(subUrl, { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setSubscriptionDetails({
            plan: data.plan,
            subscriptionStatus: data.subscriptionStatus,
            cancelAtPeriodEnd: data.cancelAtPeriodEnd,
            currentPeriodEnd: data.currentPeriodEnd,
          })
          if (
            data.plan &&
            (user.plan !== data.plan ||
              user.subscriptionStatus !== data.subscriptionStatus)
          ) {
            setUser({
              ...user,
              plan: data.plan,
              subscriptionStatus: data.subscriptionStatus,
            })
          }
        }
      } catch (err) {
        console.warn('Failed to fetch subscription details', err)
      }
    }
    fetchSub()
  }, [user?.id])

  const cancelAtPeriodEnd =
    subscriptionDetails?.cancelAtPeriodEnd ?? Boolean(user?.cancelAtPeriodEnd)
  const currentPeriodEnd =
    subscriptionDetails?.currentPeriodEnd ?? user?.currentPeriodEnd

  const formattedPeriodEndDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString(
        t('subscription.mo') === 'Mois' ? 'fr-FR' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' },
      )
    : null

  const handleSubscribe = () => {
    if (!user) {
      toast.info(t('subscription.loginToast'))
      navigate({ to: '/login' })
      return
    }

    if (isPro) {
      toast.info(t('subscription.activeSubscription'))
      return
    }

    const configuredMonthlyUrl = POLAR_CONFIG.checkoutUrl.trim()
    const configuredYearlyUrl = POLAR_CONFIG.yearlyCheckoutUrl.trim()
    const activeUrl = isYearly
      ? configuredYearlyUrl || configuredMonthlyUrl
      : configuredMonthlyUrl

    const isExampleUrl =
      !activeUrl || activeUrl.includes('example') || activeUrl === ''

    if (isExampleUrl) {
      setShowConfigModal(true)
      return
    }

    setIsRedirecting(true)
    const returnUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/subscription?success=true`
        : undefined

    const checkoutUrl = buildPolarCheckoutUrl({
      userId: user.id,
      userEmail: user.email,
      returnUrl,
      interval: isYearly ? 'year' : 'month',
    })

    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      setIsRedirecting(false)
      toast.error('Unable to generate payment checkout link.')
    }
  }

  const handleLaunchCustomCheckout = () => {
    if (!customCheckoutUrl.trim() || !user) return

    const returnUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/subscription?success=true`
        : undefined

    let targetUrl = customCheckoutUrl.trim()
    const sep = targetUrl.includes('?') ? '&' : '?'
    targetUrl += `${sep}customer_email=${encodeURIComponent(user.email)}&metadata[userId]=${encodeURIComponent(user.id)}`
    if (returnUrl) {
      targetUrl += `&success_url=${encodeURIComponent(returnUrl)}`
    }

    setShowConfigModal(false)
    window.location.href = targetUrl
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-150 w-150 rounded-full bg-[#e9c349] opacity-10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 z-0 h-125 w-125 rounded-full bg-[#c5c0fe] opacity-10 blur-[100px]" />

      <header
        style={{
          paddingTop:
            'max(1.25rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))',
        }}
        className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/5 bg-[#001809]/95 px-6 pb-4 backdrop-blur-xl"
      >
        <Link
          to="/dashboard"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 min-w-0">
          <Crown className="h-5 w-5 shrink-0 text-[#e9c349]" />
          <h1 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#e9c349] whitespace-nowrap">
            SoulType PRO
          </h1>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-32 pt-6">
        {search.success && (
          <div className="mb-6 rounded-2xl border border-[#e9c349]/40 bg-[#e9c349]/10 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(233,195,73,0.15)] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9c349] text-[#001809]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#e9c349]">
                  {t('subscription.welcomeTitle')}
                </h3>
                <p className="mt-0.5 text-xs text-[#c8c5d0]">
                  {t('subscription.welcomeDesc')}
                </p>
              </div>
            </div>
          </div>
        )}

        {isPro && (
          <div
            className={`mb-6 rounded-2xl border p-4 backdrop-blur-xl shadow-lg transition-all ${
              cancelAtPeriodEnd
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                : 'border-[#e9c349]/30 bg-[#e9c349]/10 text-[#c9ebd0]'
            }`}
          >
            <div className="flex items-start gap-3 text-left">
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  cancelAtPeriodEnd
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-[#e9c349]/20 text-[#e9c349]'
                }`}
              >
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e9c349]">
                    {cancelAtPeriodEnd
                      ? t('subscription.cancellationScheduled')
                      : t('subscription.renewalScheduled')}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(getPolarPortalUrl(user?.email), '_blank')
                    }
                    className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[#e9c349] hover:underline shrink-0"
                  >
                    <span>{t('settings.manageSubscription')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#c8c5d0]">
                  {formattedPeriodEndDate
                    ? cancelAtPeriodEnd
                      ? t('subscription.cancellationNotice', {
                          date: formattedPeriodEndDate,
                        })
                      : t('subscription.renewalNotice', {
                          date: formattedPeriodEndDate,
                        })
                    : t('subscription.proPlanSubtitle')}
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="text-center">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#e9c349] sm:text-4xl">
            {t('subscription.choosePlanTitle')}
          </h2>

          <div className="relative mx-auto my-6 flex h-32 w-32 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#e9c349]/20 blur-2xl animate-pulse" />
            <div className="absolute -inset-2 rounded-full border border-[#e9c349]/20 pointer-events-none" />
            {user?.avatarSeed && isAvatarGenerated(user.avatarSeed) ? (
              <img
                src={user.avatarSeed}
                alt={user.type || 'Soul Coach'}
                className="relative z-10 h-28 w-28 rounded-full border-2 border-[#e9c349]/40 object-cover shadow-[0_0_30px_rgba(233,195,73,0.3)] transition-transform hover:scale-105"
              />
            ) : (
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#e9c349]/40 bg-linear-to-b from-[#e9c349]/25 to-[#032110] shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                <Sparkles className="h-12 w-12 text-[#e9c349] animate-bounce" />
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3.5 text-left">
            <div
              onClick={() => {
                if (!isPro) setIsYearly(true)
              }}
              className={`relative rounded-2xl transition-all duration-200 select-none ${
                isPro
                  ? 'cursor-not-allowed opacity-50 border border-white/10 bg-white/5 pointer-events-none'
                  : 'cursor-pointer ' +
                    (isYearly
                      ? 'border-2 border-[#e9c349] bg-linear-to-b from-[#e9c349]/15 to-[#001809] shadow-[0_0_35px_rgba(233,195,73,0.2)]'
                      : 'border border-white/10 bg-[rgba(197,192,254,0.02)] hover:border-white/20 hover:bg-white/5 opacity-80')
              }`}
            >
              <div className="flex items-center justify-center rounded-t-xl bg-[#e9c349] py-1 px-3 text-[10px] font-black uppercase tracking-wider text-[#001809]">
                ★ {t('subscription.mostPopularBadge')}
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="pr-2">
                  <h4 className="text-sm font-bold text-[#c9ebd0] sm:text-base">
                    {t('subscription.yearlyPlanTitle')}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-[#c8c5d0]/70">
                    {t('subscription.yearlyPlanSub')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="font-serif text-xs text-[#c8c5d0]/40 line-through">
                        {t('subscription.yearlyPlanOriginalPrice')}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#e9c349] sm:text-xl">
                        {t('subscription.yearlyPlanPrice')}
                      </span>
                      <span className="text-[10px] text-[#c8c5d0]/60">
                        {t('subscription.perMonth')}
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#e9c349]/90 font-medium">
                      {t('subscription.save20Free')}
                    </span>
                  </div>

                  {isYearly ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 fill-[#e9c349] text-[#001809]" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-white/25" />
                  )}
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                if (!isPro) setIsYearly(false)
              }}
              className={`relative rounded-2xl transition-all duration-200 select-none ${
                isPro
                  ? 'cursor-not-allowed opacity-50 border border-white/10 bg-white/5 pointer-events-none'
                  : 'cursor-pointer ' +
                    (!isYearly
                      ? 'border-2 border-[#e9c349] bg-linear-to-b from-[#e9c349]/15 to-[#001809] shadow-[0_0_35px_rgba(233,195,73,0.2)]'
                      : 'border border-white/10 bg-[rgba(197,192,254,0.02)] hover:border-white/20 hover:bg-white/5 opacity-80')
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="pr-2">
                  <h4 className="text-sm font-bold text-[#c9ebd0] sm:text-base">
                    {t('subscription.monthlyPlanTitle')}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-[#c8c5d0]/70">
                    {t('subscription.monthlyPlanSub')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="font-serif text-lg font-bold text-[#e9c349] sm:text-xl">
                        {t('subscription.monthlyPlanPrice')}
                      </span>
                      <span className="text-[10px] text-[#c8c5d0]/60">
                        {t('subscription.perMonth')}
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#c8c5d0]/60 font-medium">
                      {t('subscription.billedMonthly')}
                    </span>
                  </div>

                  {!isYearly ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 fill-[#e9c349] text-[#001809]" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-white/25" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubscribe}
            disabled={isRedirecting || isPro}
            className={`mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm sm:text-base font-bold transition-all ${
              isPro
                ? 'cursor-not-allowed border border-white/10 bg-white/10 text-[#c8c5d0]/40 opacity-60 shadow-none pointer-events-none select-none hover:bg-white/10 active:scale-100'
                : 'cursor-pointer bg-[#e9c349] font-black text-[#001809] shadow-[0_0_30px_rgba(233,195,73,0.35)] hover:bg-[#e9c349]/90 active:scale-[0.98]'
            }`}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{t('subscription.connecting')}</span>
              </>
            ) : isPro ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-[#e9c349]" />
                <span>{t('subscription.activeSubscription')}</span>
              </>
            ) : (
              <>
                <span>{t('subscription.ctaUnlockPro')}</span>
                <Zap className="h-4.5 w-4.5 fill-current" />
              </>
            )}
          </Button>

          {isPro && user?.email && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#c8c5d0]/75">
              <span>{t('subscription.manageActiveSub')}</span>
              <button
                type="button"
                onClick={() =>
                  window.open(getPolarPortalUrl(user.email), '_blank')
                }
                className="inline-flex cursor-pointer items-center gap-1 font-semibold text-[#e9c349] hover:underline"
              >
                <span>{t('settings.manageSubscription')}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="mt-3.5 space-y-1.5 text-center">
            <p className="text-[11px] text-[#c8c5d0]/80">
              {isYearly
                ? t('subscription.trustMicrocopyYearly')
                : t('subscription.trustMicrocopyMonthly')}
            </p>
            <div className="flex items-center justify-center gap-4 text-[10px] text-[#c8c5d0]/50 pt-1">
              <Link
                to="/terms"
                className="underline hover:text-white transition-colors"
              >
                {t('subscription.termsLink')}
              </Link>
              <span>•</span>
              <Link
                to="/privacy"
                className="underline hover:text-white transition-colors"
              >
                {t('subscription.privacyLink')}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14 pt-8 border-t border-white/5">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#e9c349]">
              <Sparkles className="h-3 w-3" />
              {t('subscription.elevation')}
            </span>
            <h3 className="mt-2 font-serif text-xl font-normal text-[#c9ebd0]">
              {t('subscription.whyProTitle')}
            </h3>
            <p className="mt-1 text-xs text-[#c8c5d0]/70 max-w-md mx-auto">
              {t('subscription.whyProSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349]">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#c9ebd0]">
                    {t('subscription.privilege1Title')}
                  </h4>
                  <p className="text-[11px] text-[#c8c5d0]/70 mt-0.5">
                    {t('subscription.privilege1Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349]">
                  <Brain className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#c9ebd0]">
                    {t('subscription.privilege2Title')}
                  </h4>
                  <p className="text-[11px] text-[#c8c5d0]/70 mt-0.5">
                    {t('subscription.privilege2Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349]">
                  <BarChart3 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#c9ebd0]">
                    {t('subscription.privilege3Title')}
                  </h4>
                  <p className="text-[11px] text-[#c8c5d0]/70 mt-0.5">
                    {t('subscription.privilege3Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9c349]/15 text-[#e9c349]">
                  <Compass className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#c9ebd0]">
                    {t('subscription.privilege4Title')}
                  </h4>
                  <p className="text-[11px] text-[#c8c5d0]/70 mt-0.5">
                    {t('subscription.privilege4Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.015)] p-4 text-center text-xs text-[#c8c5d0]/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#e9c349]" />
              <span>{t('subscription.securePayment')}</span>
            </div>
            <div className="hidden h-3 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#e9c349]" />
              <span>{t('subscription.ssl')}</span>
            </div>
            <div className="hidden h-3 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-[#e9c349]" />
              <span>{t('subscription.cancelAnytime')}</span>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-center mb-6">
              <h3 className="font-serif text-xl font-normal text-[#c9ebd0]">
                {t('subscription.faqTitle')}
              </h3>
              <p className="mt-1 text-xs text-[#c8c5d0]/60">
                {t('subscription.faqSubtitle')}
              </p>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-[#c9ebd0] transition-colors hover:text-[#e9c349] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#c8c5d0]/60 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180 text-[#e9c349]' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-white/5 px-4 pb-4 pt-2.5 text-xs leading-relaxed text-[#c8c5d0]/80">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#e9c349]/30 bg-[#032110] p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-[#e9c349]">
              <Crown className="h-6 w-6" />
              <h3 className="font-serif text-xl">Polar Checkout Link</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#c8c5d0]/80">
              To connect your live payments, set the{' '}
              <code className="rounded bg-white/10 px-1 py-0.5 text-[#e9c349]">
                VITE_POLAR_CHECKOUT_URL
              </code>{' '}
              environment variable in your{' '}
              <code className="rounded bg-white/10 px-1 py-0.5 text-[#e9c349]">
                .env
              </code>{' '}
              file with your Polar product checkout link.
            </p>
            <div className="mt-4 space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#c8c5d0]/60">
                Or paste your Polar checkout link:
              </label>
              <input
                type="url"
                value={customCheckoutUrl}
                onChange={(e) => setCustomCheckoutUrl(e.target.value)}
                placeholder="https://buy.polar.sh/polar_cl_..."
                className="w-full rounded-xl border border-white/10 bg-[#001809] px-4 py-3 text-xs text-[#c9ebd0] focus:border-[#e9c349] focus:outline-none"
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowConfigModal(false)}
                className="rounded-full text-xs text-[#c8c5d0]"
              >
                Cancel
              </Button>
              <Button
                disabled={!customCheckoutUrl.trim()}
                onClick={handleLaunchCustomCheckout}
                className="rounded-full bg-[#e9c349] text-xs font-bold text-[#001809]"
              >
                Open Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      <DashboardBottomNav />
    </div>
  )
}
