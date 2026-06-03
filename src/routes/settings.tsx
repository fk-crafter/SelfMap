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
      <div className="flex h-screen items-center justify-center bg-[#F9F7FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1D1B4B]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7FA] text-[#1A1A1A]">
      <header className="flex items-center gap-4 px-6 pt-8 pb-4">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1D1B4B]/5 bg-white text-[#1D1B4B] shadow-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#1D1B4B]">Settings</h1>
      </header>

      <main className="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col space-y-6 px-6 pb-12">
        <Card className="border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <h2 className="mb-4 text-lg font-bold text-[#1D1B4B]">
            Edit Profile
          </h2>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div className="space-y-2">
              <label className="pl-1 text-xs font-bold tracking-widest text-[#1A1A1A]/40 uppercase">
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
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A1A1A]/30" />
              </div>
            </div>

            {error && (
              <p className="pl-1 text-xs font-medium text-red-500">{error}</p>
            )}

            {success && (
              <p className="pl-1 text-xs font-medium text-green-600">
                Name updated successfully!
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading || name.trim() === data?.user.name}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#1D1B4B] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1D1B4B]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </Card>

        <Card className="mt-8 border-none bg-red-50 p-6 shadow-xl shadow-red-500/5 rounded-3xl">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
          </div>
          <p className="mb-6 text-sm text-red-600/70 leading-relaxed">
            Once you delete your account, there is no going back. All your data,
            test results, and chat history will be permanently erased.
          </p>

          {deleteError && (
            <p className="mb-4 pl-1 text-xs font-medium text-red-500">
              {deleteError}
            </p>
          )}

          {showDeleteConfirm ? (
            <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm border border-red-100">
              <p className="text-center text-sm font-bold text-[#1A1A1A]">
                Are you absolutely sure?
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={isDeleting}
                  className="flex-1 rounded-full border-transparent bg-gray-100 text-[#1A1A1A] hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 rounded-full bg-red-600 text-white hover:bg-red-700"
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
              className="flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-100 border border-red-200 active:scale-[0.98]"
            >
              Delete Account
            </Button>
          )}
        </Card>
      </main>
    </div>
  )
}
