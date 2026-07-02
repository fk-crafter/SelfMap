import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Send, Sparkles, User, Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { motion } from 'motion/react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function ChatPage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Bonjour. Je suis ton Soul Coach. Qu'est-ce qui occupe tes pensées aujourd'hui ?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  useEffect(() => {
    const fetchHistory = async () => {
      if (!data?.user.id) return

      try {
        const res = await fetch('/api/chat/history', {
          headers: {
            'x-user-id': data.user.id,
          },
        })

        if (res.ok) {
          const history = await res.json()
          if (history && history.length > 0) {
            setMessages(history)
          }
        }
      } catch (error) {
        toast.error("Impossible de charger l'historique.")
      }
    }

    fetchHistory()
  }, [data?.user.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !data?.user.id) return

    const userContent = input
    setMessages((prev) => [...prev, { role: 'user', content: userContent }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': data.user.id,
        },
        body: JSON.stringify({ content: userContent }),
      })

      if (!res.ok) throw new Error('Erreur réseau')

      const result = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.reply },
      ])
    } catch (error) {
      toast.error('Le coach est indisponible pour le moment.')
      setMessages((prev) => prev.slice(0, -1))
      setInput(userContent)
    } finally {
      setIsLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full bg-[#c5c0fe] opacity-5 blur-[100px] pointer-events-none z-0" />

      <header className="flex-none sticky top-0 z-30 flex items-center gap-4 bg-[#001809]/80 px-6 py-5 backdrop-blur-xl border-b border-white/5">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c5c0fe]/20 text-[#c5c0fe]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h1 className="font-serif text-xl font-normal text-[#c5c0fe] tracking-tight">
            Soul Coach
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 z-10 space-y-6">
        {messages.map((msg, index) => {
          const isAi = msg.role === 'assistant'
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div
                className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full mt-auto ${isAi ? 'bg-[#c5c0fe]/10 text-[#c5c0fe]' : 'bg-[#e9c349]/10 text-[#e9c349]'}`}
              >
                {isAi ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              <div
                className={`max-w-[75%] rounded-[1.5rem] px-5 py-3.5 text-sm leading-relaxed ${
                  isAi
                    ? 'rounded-bl-sm bg-[rgba(197,192,254,0.05)] border border-white/5 text-[#c8c5d0]'
                    : 'rounded-br-sm bg-[#e9c349]/10 border border-[#e9c349]/20 text-[#e9c349]'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          )
        })}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 flex-row"
          >
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full mt-auto bg-[#c5c0fe]/10 text-[#c5c0fe]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="rounded-[1.5rem] rounded-bl-sm bg-[rgba(197,192,254,0.05)] border border-white/5 px-5 py-4 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5c0fe]/50 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5c0fe]/50 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5c0fe]/50 animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="flex-none p-4 z-10 bg-[#001809]/80 backdrop-blur-xl border-t border-white/5 pb-safe">
        <form
          onSubmit={sendMessage}
          className="flex gap-2 max-w-2xl mx-auto relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris à ton coach..."
            disabled={isLoading}
            className="w-full rounded-full border border-white/10 bg-[rgba(197,192,254,0.02)] px-6 py-4 text-sm text-[#c9ebd0] placeholder:text-[#c8c5d0]/30 focus:outline-none focus:ring-1 focus:ring-[#c5c0fe]/30 disabled:opacity-50 pr-14"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-[#c5c0fe] text-[#001809] hover:bg-[#c5c0fe]/80 transition-transform active:scale-90 disabled:opacity-50 disabled:active:scale-100"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
