import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/verify')({
  validateSearch: (search: Record<string, unknown>): { token?: string } => {
    return {
      token: typeof search.token === 'string' ? search.token : undefined,
    }
  },
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search = Route.useSearch()
  const token = search.token

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus('error')
        setErrorMessage('Missing verification token.')
        return
      }

      try {
        const { error } = await authClient.verifyEmail({
          query: { token },
        })

        if (error) {
          console.error("Détail de l'erreur Better Auth :", error)
          setStatus('error')
          setErrorMessage(
            error.message || 'Verification failed or token expired.',
          )
        } else {
          setStatus('success')
          setTimeout(() => {
            navigate({ to: '/dashboard' })
          }, 2500)
        }
      } catch (err) {
        setStatus('error')
        setErrorMessage('An unexpected error occurred during verification.')
      }
    }

    verifyToken()
  }, [token, navigate])

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#001809] p-4 font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5c0fe] opacity-[0.03] blur-[100px]" />

      <div className="z-10 w-full max-w-md rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 shadow-2xl backdrop-blur-xl sm:p-10 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#e9c349]" />
            <h1 className="font-serif text-2xl font-normal text-[#e9c349]">
              {t('verify.unlocking')}
            </h1>
            <p className="text-sm text-[#c8c5d0]/70">
              {t('verify.unlockingDesc')}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
              <ShieldCheck className="h-7 w-7 text-[#e9c349]" />
            </div>
            <h1 className="font-serif text-2xl font-normal text-[#e9c349]">
              {t('verify.unlocked')}
            </h1>
            <p className="text-sm text-[#c8c5d0]/70">
              {t('verify.unlockedDesc')}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <AlertCircle className="h-7 w-7 text-red-400" />
            </div>
            <h1 className="font-serif text-2xl font-normal text-red-400">
              {t('verify.failed')}
            </h1>
            <p className="text-sm text-[#c8c5d0]/70">{errorMessage}</p>
            <Button
              onClick={() => navigate({ to: '/login' })}
              className="mt-4 h-12 w-full rounded-full bg-[#e9c349] text-sm font-bold text-[#001809]"
            >
              {t('auth.goToLogin')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
