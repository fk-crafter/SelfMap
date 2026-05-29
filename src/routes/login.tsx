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
  Flower2,
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
    <div className="flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#EAE8EF]/50 p-4">
      <div className="w-full max-w-[400px] rounded-3xl bg-[#F9F8FC] p-6 shadow-2xl shadow-[#1D1B4B]/10 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D1B4B] shadow-lg">
            <Flower2 className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-[#1D1B4B]">
            Welcome Back
          </h1>
          <p className="text-xs font-medium text-[#1A1A1A]/60 sm:text-sm">
            Resume your journey of self-discovery.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-transparent bg-white px-4 text-sm text-[#1A1A1A] shadow-sm placeholder:text-[#1A1A1A]/40 focus-visible:ring-2 focus-visible:ring-[#1D1B4B]/20"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-transparent bg-white pl-4 pr-10 text-sm text-[#1A1A1A] shadow-sm placeholder:text-[#1A1A1A]/40 focus-visible:ring-2 focus-visible:ring-[#1D1B4B]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 transition-colors hover:text-[#1A1A1A]/70"
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
            <p className="text-center text-xs font-medium text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#1D1B4B] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1D1B4B]/90 active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="relative my-3 flex items-center justify-center">
            <div className="absolute w-full border-t border-[#1A1A1A]/10"></div>
            <span className="relative bg-[#F9F8FC] px-3 text-[10px] font-bold tracking-widest text-[#1A1A1A]/30 uppercase">
              OR
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="flex h-12 w-full items-center justify-center rounded-full border-transparent bg-white text-sm font-semibold text-[#1A1A1A] shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </form>

        <div className="mt-6 text-center text-xs font-medium text-[#1A1A1A]/60">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-[#1D1B4B] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mt-5 flex shrink-0 items-center justify-center gap-6 text-[10px] font-semibold text-[#1A1A1A]/50 sm:text-xs">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3 w-3" /> Secure Data
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3" /> Psychology Certified
        </div>
      </div>
    </div>
  )
}
