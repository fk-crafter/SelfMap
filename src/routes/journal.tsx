import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2, BookOpen, Send, Trash2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/journal')({
  component: JournalPage,
})

type JournalEntry = {
  id: string
  content: string
  createdAt: string
}

function JournalPage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  useEffect(() => {
    const fetchEntries = async () => {
      if (!data?.user.id) return
      try {
        const res = await fetch('/api/journal', {
          headers: { 'x-user-id': data.user.id },
        })
        if (res.ok) {
          const fetchedData = await res.json()
          setEntries(fetchedData)
        }
      } catch (error) {
        console.error('Failed to load journal entries', error)
      }
    }
    fetchEntries()
  }, [data?.user.id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !data?.user.id) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': data.user.id,
        },
        body: JSON.stringify({ content }),
      })

      if (res.ok) {
        const newEntry = await res.json()
        setEntries((prev) => [newEntry, ...prev])
        setContent('')
      }
    } catch (error) {
      console.error('Failed to save entry', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!data?.user.id) return
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': data.user.id },
      })

      if (res.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete entry', error)
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
      <header className="sticky top-0 z-10 flex items-center gap-4 bg-[#F9F7FA] px-6 pb-4 pt-8">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1D1B4B]/5 bg-white text-[#1D1B4B] shadow-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#1D1B4B]">My Journal</h1>
      </header>

      <main className="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col space-y-6 px-6 pb-12">
        <Card className="border-none bg-white p-6 shadow-xl shadow-[#1D1B4B]/5 rounded-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D1B4B]/5 text-[#1D1B4B]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1D1B4B]">New Entry</h2>
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A]/40">
                What's on your mind?
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              className="min-h-[120px] resize-none rounded-xl border-transparent bg-[#F9F7FA] p-4 text-sm text-[#1A1A1A] shadow-inner focus-visible:ring-2 focus-visible:ring-[#1D1B4B]/20"
            />
            <Button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1D1B4B] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1D1B4B]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Save Entry
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <h3 className="pl-1 text-sm font-bold uppercase tracking-wider text-[#1D1B4B]">
            Past Entries
          </h3>
          {entries.length === 0 ? (
            <p className="pl-1 text-sm text-[#1A1A1A]/40">
              No entries yet. Start writing!
            </p>
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                className="group border-none bg-white p-5 shadow-sm rounded-2xl relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/40">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-[#1A1A1A]/20 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1A1A1A]/80">
                  {entry.content}
                </p>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
