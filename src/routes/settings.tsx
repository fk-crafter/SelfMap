import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2, User, AlertTriangle } from 'lucide-react'
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

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

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

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setDeleteError('')

    try {
      const { error: delError } = await authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: '/register' })
          },
        },
      })

      if (delError) {
        setDeleteError(
          delError.message ||
            'Failed to delete account. Please re-login and try again.',
        )
        setIsDeleting(false)
      }
    } catch (err) {
      setDeleteError('An unexpected error occurred.')
      setIsDeleting(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-x-hidden">
      <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full bg-[#c5c0fe] opacity-10 blur-[80px] pointer-events-none z-0" />

      <header className="sticky top-0 z-30 flex items-center gap-4 bg-[#001809]/80 px-6 py-5 backdrop-blur-xl border-b border-white/5">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-2xl font-normal text-[#e9c349] tracking-tight">
          Settings
        </h1>
      </header>

      <main className="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col space-y-6 px-6 pb-12 relative z-10">
        <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
          <h2 className="mb-6 font-serif text-xl text-[#c9ebd0]">
            Edit Profile
          </h2>

          <form onSubmit={handleUpdateName} className="space-y-5">
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-bold tracking-[0.2em] text-[#c8c5d0]/50 uppercase">
                First Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 rounded-xl border border-white/10 bg-[#032110] pl-4 pr-10 text-sm text-[#c9ebd0] shadow-inner focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
                />
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c5d0]/40" />
              </div>
            </div>

            {error && (
              <p className="pl-1 text-xs font-medium text-[#ffb4ab]">{error}</p>
            )}

            {success && (
              <p className="pl-1 text-xs font-medium text-[#c9ebd0]">
                Name updated successfully!
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading || name.trim() === data?.user.name}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#e9c349] text-sm font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-transform hover:bg-[#e9c349]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </Card>

        <Card className="mt-8 border border-[#93000a]/30 bg-[#93000a]/10 backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#ffb4ab]" />
            <h2 className="font-serif text-xl text-[#ffb4ab]">Danger Zone</h2>
          </div>
          <p className="mb-6 text-sm text-[#ffb4ab]/80 leading-relaxed">
            Once you delete your account, there is no going back. All your data,
            test results, and chat history will be permanently erased.
          </p>

          {deleteError && (
            <p className="mb-4 pl-1 text-xs font-medium text-[#ffb4ab]">
              {deleteError}
            </p>
          )}

          {showDeleteConfirm ? (
            <div className="space-y-4 rounded-2xl bg-[#001206] p-5 border border-[#93000a]/30">
              <p className="text-center text-sm font-bold text-[#ffb4ab]">
                Are you absolutely sure?
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={isDeleting}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 rounded-full bg-[#93000a] text-[#ffdad6] hover:bg-[#690005]"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Yes, Delete'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#93000a]/20 text-sm font-bold text-[#ffb4ab] border border-[#93000a]/50 transition-all hover:bg-[#93000a]/40 active:scale-[0.98]"
            >
              Delete Account
            </Button>
          )}
        </Card>
      </main>
    </div>
  )
}
