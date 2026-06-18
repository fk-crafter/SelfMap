import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2, BookOpen, Send, Trash2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

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
        toast.error('Failed to load entries')
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
        toast.success('Thought recorded')
      }
    } catch (error) {
      toast.error('Could not save your entry')
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
        toast.success('Entry removed')
      }
    } catch (error) {
      toast.error('Failed to delete entry')
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
      <div className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full bg-[#c5c0fe] opacity-10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute w-[400px] h-[400px] top-1/2 -right-20 rounded-full bg-[#e9c349] opacity-5 blur-[80px] pointer-events-none z-0" />

      <header className="sticky top-0 z-30 flex items-center gap-4 bg-[#001809]/80 px-6 py-5 backdrop-blur-xl border-b border-white/5">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-2xl font-normal text-[#e9c349] tracking-tight">
          Inner Journal
        </h1>
      </header>

      <main className="mx-auto mt-4 flex w-full max-w-md flex-1 flex-col space-y-8 px-6 pb-24 relative z-10">
        <Card className="border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl rounded-[2rem]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9c349]/10 text-[#e9c349]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#c9ebd0]">New Entry</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#c8c5d0]/50">
                What's on your mind?
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              className="min-h-[120px] resize-none rounded-xl border border-white/10 bg-[#032110] p-4 text-sm text-[#c9ebd0] shadow-inner placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
            />
            <Button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#e9c349] text-sm font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-transform hover:bg-[#e9c349]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
          <h3 className="pl-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e9c349]">
            Past Entries
          </h3>
          {entries.length === 0 ? (
            <p className="pl-1 text-sm text-[#c8c5d0]/50">
              No entries yet. The blank page awaits.
            </p>
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                className="group border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-5 shadow-lg rounded-[1.5rem] relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#c8c5d0]/50">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-[#c8c5d0]/30 hover:text-[#ffb4ab] transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#c8c5d0]">
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
