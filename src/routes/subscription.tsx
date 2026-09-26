import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Sparkles,
  ArrowLeft,
  Check,
  Crown,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Loader2,
  Lock,
  Zap,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PLANS, buildPolarCheckoutUrl, POLAR_CONFIG } from '@/lib/polar'
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

function SubscriptionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search = Route.useSearch()
  const { data: sessionData, refetch } = authClient.useSession()
  const storedUser = useUserStore((state: any) => state.user)
  const setUser = useUserStore((state: any) => state.setUser)
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
  const currentPlan = (user?.plan || 'FREE').toUpperCase()
  const isPro = currentPlan === 'PRO'

  useEffect(() => {
    if (search.success) {
      toast.success(
        t('subscription.successToast'),
        {
          duration: 5000,
        },
      )
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

  const handleSubscribe = () => {
    if (!user) {
      toast.info(t('subscription.loginToast'))
      navigate({ to: '/login' })
      return
    }

    if (isPro) {
      window.open(POLAR_CONFIG.portalUrl, '_blank')
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

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#001809]/80 px-6 py-4 backdrop-blur-xl">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#e9c349]" />
          <h1 className="font-serif text-xl font-normal tracking-tight text-[#e9c349]">
            {t('subscription.title')}
          </h1>
        </div>
        <div className="w-10" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pb-32 pt-8">
        {search.success && (
          <div className="mb-8 rounded-2xl border border-[#e9c349]/40 bg-[#e9c349]/10 p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(233,195,73,0.15)] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9c349] text-[#001809]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#e9c349]">
                  {t('subscription.welcomeTitle')}
                </h3>
                <p className="mt-1 text-sm text-[#c8c5d0]">
                  {t('subscription.welcomeDesc')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#e9c349]">
            <Sparkles className="h-3.5 w-3.5" />
            {t('subscription.elevation')}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-[#c9ebd0] sm:text-5xl">
            {t('subscription.heroTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#c8c5d0]/80 sm:text-base">
            {t('subscription.heroSubtitle')}
          </p>

          {user && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#c8c5d0]">
              <span>{t('subscription.currentPlan')}</span>
              <span
                className={`font-bold uppercase tracking-wider ${
                  isPro ? 'text-[#e9c349]' : 'text-[#c5c0fe]'
                }`}
              >
                {currentPlan === 'PRO'
                  ? 'Sanctuary PRO'
                  : currentPlan === 'BETA'
                    ? 'Founding Member BETA'
                    : `${t('subscription.freePlanName')} (Awakening)`}
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PLANS.map((plan) => {
            const isPlanActive =
              (plan.id === 'FREE' && currentPlan === 'FREE') ||
              (plan.id === 'PRO' && isPro)

            const planFeatures =
              plan.id === 'FREE'
                ? [
                    { text: t('subscription.freeFeature1') },
                    { text: t('subscription.freeFeature2') },
                    { text: t('subscription.freeFeature3') },
                    { text: t('subscription.freeFeature4') },
                  ]
                : [
                    { text: t('subscription.proFeature1'), highlight: true },
                    {
                      text: t('subscription.proFeature2'),
                      highlight: true,
                    },
                    { text: t('subscription.proFeature3') },
                    { text: t('subscription.proFeature4') },
                    { text: t('subscription.proFeature5') },
                    { text: t('subscription.proFeature6') },
                  ]

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#e9c349]/50 bg-linear-to-b from-[#e9c349]/10 to-[rgba(197,192,254,0.02)] shadow-[0_0_40px_rgba(233,195,73,0.12)]'
                    : 'border border-white/5 bg-[rgba(197,192,254,0.02)] shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  {plan.popular ? (
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-md whitespace-nowrap">
                      <span
                        className={`text-[11px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors ${!isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                      >
                        {t('subscription.mo')}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full bg-white/10 transition-colors duration-300 ease-in-out focus:outline-none"
                        aria-label="Switch between monthly and annual"
                      >
                        <span
                          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-[#e9c349] transition duration-300 ease-in-out ${isYearly ? 'translate-x-4' : 'translate-x-1'}`}
                        />
                      </button>
                      <span
                        className={`text-[11px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors ${isYearly ? 'text-[#e9c349]' : 'text-[#c8c5d0]/50'}`}
                      >
                        {t('subscription.yr')}
                      </span>
                    </div>
                  ) : (
                    <div />
                  )}

                  {plan.popular && (
                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#e9c349] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#001809]">
                      <Crown className="h-3 w-3 shrink-0" />
                      <span>
                        {isYearly ? t('subscription.save20') : plan.badge}
                      </span>
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-serif text-2xl font-normal text-[#c9ebd0]">
                    {plan.id === 'FREE'
                      ? t('subscription.freePlanName')
                      : t('subscription.proPlanName')}
                  </h3>
                  <p className="mt-1 text-xs text-[#c8c5d0]/70">
                    {plan.id === 'PRO' && isYearly
                      ? t('subscription.proPlanYearlySubtitle')
                      : plan.id === 'PRO'
                        ? t('subscription.proPlanSubtitle')
                        : t('subscription.freePlanSubtitle')}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    {plan.id === 'PRO' && isYearly && (
                      <span className="mr-1 font-serif text-2xl text-[#c8c5d0]/40 line-through">
                        $15
                      </span>
                    )}
                    <span className="font-serif text-4xl font-normal text-[#e9c349]">
                      {plan.id === 'PRO' && isYearly
                        ? plan.yearlyPrice
                        : plan.price}
                    </span>
                    <span className="text-xs text-[#c8c5d0]/60">
                      {plan.id === 'PRO' && isYearly
                        ? (t('subscription.mo') === 'Mois' ? '/ mois' : '/ month')
                        : (t('subscription.mo') === 'Mois' ? '/ mois' : '/ month')}
                    </span>
                  </div>

                  {plan.id === 'PRO' && (
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#e9c349]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#e9c349]">
                        {isYearly
                          ? t('subscription.billedAnnually')
                          : t('subscription.billedMonthly')}
                      </span>
                    </div>
                  )}

                  <p className="mt-4 text-xs leading-relaxed text-[#c8c5d0]/80">
                    {plan.id === 'FREE'
                      ? t('subscription.freePlanDesc')
                      : t('subscription.proPlanDesc')}
                  </p>

                  <div className="my-6 h-px w-full bg-white/10" />

                  <ul className="space-y-3.5 text-xs text-[#c8c5d0]">
                    {planFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? 'bg-[#e9c349]/20 text-[#e9c349]'
                              : 'bg-white/10 text-[#c8c5d0]'
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span
                          className={
                            feature.highlight
                              ? 'font-medium text-[#c9ebd0]'
                              : 'text-[#c8c5d0]/80'
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  {plan.id === 'PRO' ? (
                    isPro ? (
                      <div className="space-y-2">
                        <Button
                          disabled
                          className="w-full cursor-default rounded-full border border-[#e9c349]/40 bg-[#e9c349]/20 py-6 text-sm font-bold text-[#e9c349]"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          {t('subscription.currentPlanBtn')}
                        </Button>
                        <Button
                          onClick={() =>
                            window.open(POLAR_CONFIG.portalUrl, '_blank')
                          }
                          variant="ghost"
                          className="w-full text-xs text-[#c8c5d0]/70 hover:text-[#e9c349]"
                        >
                          {t('subscription.manageBtn')}
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleSubscribe}
                        disabled={isRedirecting}
                        className="group w-full cursor-pointer rounded-full bg-[#e9c349] py-6 text-sm font-bold text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.3)] transition-all hover:bg-[#e9c349]/90 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {isRedirecting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('subscription.connecting')}
                          </>
                        ) : (
                          <>
                            {t('subscription.joinPro')}{' '}
                            {isYearly
                              ? `($144/${t('subscription.yr').toLowerCase()})`
                              : `($15/${t('subscription.mo').toLowerCase()})`}
                            <Zap className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          </>
                        )}
                      </Button>
                    )
                  ) : (
                    <Button
                      disabled={isPlanActive}
                      variant="outline"
                      className="w-full rounded-full border-white/10 bg-white/5 py-6 text-sm text-[#c8c5d0]"
                    >
                      {isPlanActive
                        ? t('subscription.currentPlanBtn')
                        : t('subscription.standardIncluded')}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.015)] p-5 text-center text-xs text-[#c8c5d0]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#e9c349]" />
            <span>{t('subscription.securePayment')}</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#e9c349]" />
            <span>{t('subscription.ssl')}</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-[#e9c349]" />
            <span>{t('subscription.cancelAnytime')}</span>
          </div>
        </div>

        {isPro && (
          <div className="mt-6 text-center">
            <a
              href={POLAR_CONFIG.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#e9c349] hover:underline"
            >
              {t('subscription.portalLink')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <div className="mt-16">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-normal text-[#c9ebd0]">
              {t('subscription.faqTitle')}
            </h3>
            <p className="mt-1 text-xs text-[#c8c5d0]/60">
              {t('subscription.faqSubtitle')}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-medium text-[#c9ebd0] transition-colors hover:text-[#e9c349]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#c8c5d0]/60 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-[#e9c349]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="border-t border-white/5 px-5 pb-5 pt-3 text-xs leading-relaxed text-[#c8c5d0]/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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
