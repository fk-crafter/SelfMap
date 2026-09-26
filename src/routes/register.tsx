import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  ShieldCheck,
  Fingerprint,
  MailCheck,
  KeyRound,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { registerSchema } from '@/lib/validations'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vipCode, setVipCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const profile = useUserStore((state) => state.profile)
  const storedUser = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state._hasHydrated)
  const { data, isPending } = authClient.useSession()

  useEffect(() => {
    if (storedUser) {
      navigate({ to: '/dashboard', replace: true })
      return
    }
    if (hasHydrated && !isPending && data?.session) {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [storedUser, hasHydrated, isPending, data, navigate])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms) {
      setError(t('auth.termsRequired'))
      return
    }

    const validation = registerSchema.safeParse({ name, email, password })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return
    }

    setIsLoading(true)
    setError('')

    const assignedPlan = vipCode.trim() === 'USERBETA' ? 'BETA' : 'FREE'

    try {
      const { error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name,
        type: profile?.type,
        scores: profile?.scores ? JSON.stringify(profile.scores) : undefined,
        plan: assignedPlan,
        rememberMe: true,
        callbackURL: 'https://self-map-beta.vercel.app',
      } as any)

      if (signUpError) {
        setError(
          signUpError.message || 'An error occurred during registration.',
        )
        setIsLoading(false)
        return
      }

      sessionStorage.removeItem('hasSeenOnboarding')
      setEmailSent(true)
    } catch (err) {
      setError(t('auth.unexpectedError'))
      setIsLoading(false)
    }
  }

  if (storedUser || (hasHydrated && !isPending && data?.session)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#001809] p-4 font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5c0fe] opacity-[0.03] blur-[100px]" />

      <div className="z-10 w-full max-w-md rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        {emailSent ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
              <MailCheck className="h-8 w-8 text-[#e9c349]" />
            </div>
            <h1 className="mb-3 font-serif text-3xl font-normal tracking-tight text-[#e9c349]">
              {t('auth.checkEmail')}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-[#c8c5d0]/70">
              {t('auth.checkEmailSent')} <br />
              <span className="font-bold text-[#c9ebd0]">{email}</span>. <br />
              {t('auth.checkEmailVerify')}
            </p>
            <Button
              onClick={() => navigate({ to: '/login' })}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#e9c349] text-sm font-bold tracking-wider text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] transition-transform hover:bg-[#e9c349]/90 active:scale-[0.98]"
            >
              {t('auth.goToLogin')}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
                <Fingerprint
                  className="h-7 w-7 text-[#e9c349]"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="mb-2 font-serif text-3xl font-normal tracking-tight text-[#e9c349]">
                {t('auth.registerTitle')}
              </h1>
              <p className="text-sm font-medium text-[#c8c5d0]/70">
                {t('auth.registerSubtitle')}
              </p>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={t('auth.fullName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] px-6 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                />

                <Input
                  type="email"
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] px-6 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] pl-6 pr-12 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c8c5d0]/40 transition-colors hover:text-[#e9c349]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t('auth.betaCode')}
                    value={vipCode}
                    onChange={(e) => setVipCode(e.target.value)}
                    className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] pl-12 pr-6 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                  />
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c8c5d0]/40" />
                </div>
              </div>

              <div className="mt-1 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/10 bg-[rgba(197,192,254,0.05)] accent-[#e9c349]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs font-medium leading-relaxed text-[#c8c5d0]/70"
                >
                  {t('auth.agreeTerms')}{' '}
                  <Link
                    to="/terms"
                    className="font-bold text-[#e9c349] hover:opacity-80 transition-opacity"
                  >
                    {t('auth.termsOfService')}
                  </Link>{' '}
                  {t('auth.and')}{' '}
                  <Link
                    to="/privacy"
                    className="font-bold text-[#e9c349] hover:opacity-80 transition-opacity"
                  >
                    {t('auth.privacyPolicy')}
                  </Link>
                  .
                </label>
              </div>

              {error && (
                <p className="text-center text-xs font-medium text-[#ffb4ab]">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#e9c349] text-sm font-bold tracking-wider text-[#001809] shadow-[0_0_20px_rgba(233,195,73,0.2)] transition-all hover:bg-[#e9c349]/90 active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {t('auth.startMyJourney')} <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute w-full border-t border-white/5"></div>
                <span className="relative bg-[#001809] px-4 text-[10px] font-bold tracking-[0.2em] text-[#c8c5d0]/40 uppercase">
                  {t('auth.or')}
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="flex h-12 w-full items-center justify-center rounded-full border border-white/10 bg-transparent text-sm font-semibold text-[#c8c5d0] transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                <svg className="mr-3 h-4 w-4 opacity-80" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#ffffff"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#ffffff"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#ffffff"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#ffffff"
                  />
                </svg>
                {t('auth.signUpGoogle')}
              </Button>
            </form>

            <div className="mt-8 text-center text-xs font-medium text-[#c8c5d0]/60">
              {t('auth.alreadyAccount')}{' '}
              <Link
                to="/login"
                className="font-bold text-[#e9c349] hover:opacity-80 transition-opacity"
              >
                {t('auth.logIn')}
              </Link>
            </div>
          </>
        )}
      </div>

      {!emailSent && (
        <div className="mt-8 flex shrink-0 items-center justify-center gap-6 text-[10px] font-semibold text-[#c8c5d0]/30 sm:text-xs">
          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <Lock className="h-3 w-3" /> {t('auth.secureData')}
          </div>
          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3" /> {t('auth.psychologyCertified')}
          </div>
        </div>
      )}
    </div>
  )
}
