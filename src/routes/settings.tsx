import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2, User } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  useEffect(() => {
    if (data?.user.name) {
      setName(data.user.name)
    }
  }, [data?.user.name])

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
      })

      if (updateError) {
        setError(updateError.message || 'Failed to update name.')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (err) {
      setError('An unexpected error occurred.')
      setIsLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9F7FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1D1B4B]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center gap-4 px-6 pt-8 pb-4">
        <Link
          to="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-[#1D1B4B]/5 text-[#1D1B4B] transition-transform active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#1D1B4B]">Settings</h1>
      </header>

      <main className="flex-1 px-6 mt-4 max-w-md mx-auto w-full space-y-6">
        <Card className="border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <h2 className="text-lg font-bold text-[#1D1B4B] mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-[#1A1A1A]/40 uppercase pl-1">
                First Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 rounded-xl border-transparent bg-[#F9F7FA] pl-4 pr-10 text-sm text-[#1A1A1A] shadow-inner focus-visible:ring-2 focus-visible:ring-[#1D1B4B]/20"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/30" />
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 pl-1">{error}</p>
            )}

            {success && (
              <p className="text-xs font-medium text-green-600 pl-1">
                Name updated successfully!
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading || name.trim() === data?.user.name}
              className="w-full h-12 rounded-full bg-[#1D1B4B] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1D1B4B]/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
