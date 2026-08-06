import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
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
  Fingerprint,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || 'Invalid email or password.')
        setIsLoading(false)
        return
      }

      setUser(data.user)
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError('An unexpected error occurred.')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#001809] p-4 font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5c0fe] opacity-[0.03] blur-[100px]" />

      <div className="z-10 w-full max-w-md rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_20px_rgba(233,195,73,0.1)]">
            <Fingerprint className="h-7 w-7 text-[#e9c349]" strokeWidth={1.5} />
          </div>
          <h1 className="mb-2 font-serif text-3xl font-normal tracking-tight text-[#e9c349]">
            Welcome Back
          </h1>
          <p className="text-sm font-medium text-[#c8c5d0]/70">
            Resume your journey to the inner sanctuary.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] px-6 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
                ENTER SANCTUARY <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute w-full border-t border-white/5"></div>
            <span className="relative bg-[#001809] px-4 text-[10px] font-bold tracking-[0.2em] text-[#c8c5d0]/40 uppercase">
              OR
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
            Continue with Google
          </Button>
        </form>

        <div className="mt-8 text-center text-xs font-medium text-[#c8c5d0]/60">
          First time here?{' '}
          <Link
            to="/register"
            className="font-bold text-[#e9c349] hover:opacity-80 transition-opacity"
          >
            Begin the Journey
          </Link>
        </div>
      </div>

      <div className="mt-8 flex shrink-0 items-center justify-center gap-6 text-[10px] font-semibold text-[#c8c5d0]/30 sm:text-xs">
        <div className="flex items-center gap-1.5 uppercase tracking-wider">
          <Lock className="h-3 w-3" /> Secure Connection
        </div>
        <div className="flex items-center gap-1.5 uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" /> Privacy Guarded
        </div>
      </div>
    </div>
  )
}
