import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  ShieldCheck,
  KeyRound,
  AlertCircle,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { authSchema } from '@/lib/validations'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>): { token?: string; error?: string } => {
    return {
      token: typeof search.token === 'string' ? search.token : undefined,
      error: typeof search.error === 'string' ? search.error : undefined,
    }
  },
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search = Route.useSearch()
  const token = search.token

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      setError(t('auth.invalidResetToken'))
      return
    }

    if (newPassword !== confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'))
      return
    }

    const passwordValidation = authSchema.shape.password.safeParse(newPassword)
    if (!passwordValidation.success) {
      setError(passwordValidation.error.issues[0].message)
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword,
        token,
      })

      if (resetError) {
        setError(resetError.message || t('auth.invalidResetToken'))
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
      setTimeout(() => {
        navigate({ to: '/login' })
      }, 2500)
    } catch (err) {
      setError(t('auth.unexpectedError'))
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#001809] px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-[max(env(safe-area-inset-top),1.5rem)] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150vw] w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5c0fe] opacity-[0.03] blur-[80px] sm:h-125 sm:w-125 sm:blur-[100px]" />

      <div className="z-10 flex w-full max-w-md flex-1 flex-col justify-center sm:flex-initial sm:rounded-[2rem] sm:border sm:border-white/5 sm:bg-[rgba(197,192,254,0.02)] sm:p-10 sm:shadow-2xl sm:backdrop-blur-xl">
        {!token || search.error ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <AlertCircle className="h-7 w-7 text-red-400" />
            </div>
            <h1 className="font-serif text-2xl font-normal text-red-400">
              {t('verify.failed')}
            </h1>
            <p className="text-sm text-[#c8c5d0]/70">
              {t('auth.invalidResetToken')}
            </p>
            <Button
              onClick={() => navigate({ to: '/login' })}
              className="mt-4 h-12 w-full rounded-full bg-[#e9c349] text-sm font-bold text-[#001809]"
            >
              {t('auth.goToLogin')}
            </Button>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
              <ShieldCheck className="h-8 w-8 text-[#e9c349]" />
            </div>
            <h1 className="font-serif text-3xl font-normal text-[#e9c349]">
              {t('auth.passwordResetSuccessTitle')}
            </h1>
            <p className="text-sm text-[#c8c5d0]/70">
              {t('auth.passwordResetSuccessDesc')}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
                <KeyRound
                  className="h-7 w-7 text-[#e9c349]"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="mb-2 font-serif text-3xl font-normal tracking-tight text-[#e9c349]">
                {t('auth.resetPasswordTitle')}
              </h1>
              <p className="text-sm font-medium text-[#c8c5d0]/70">
                {t('auth.resetPasswordSubtitle')}
              </p>
            </div>

            <form onSubmit={handleReset} className="flex flex-col gap-5">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.newPassword')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] px-6 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                />
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
                    {t('auth.updatePassword')} <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>

      <div className="mt-auto flex shrink-0 items-center justify-center gap-6 pt-8 text-[10px] font-semibold text-[#c8c5d0]/30 sm:mt-8 sm:pt-0 sm:text-xs">
        <div className="flex items-center gap-1.5 uppercase tracking-wider">
          <Lock className="h-3 w-3" /> {t('auth.secureConnection')}
        </div>
        <div className="flex items-center gap-1.5 uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" /> {t('auth.privacyGuarded')}
        </div>
      </div>
    </div>
  )
}
