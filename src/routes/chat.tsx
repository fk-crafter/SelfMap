import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowUp, Loader2, MoreVertical } from 'lucide-react'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { authClient } from '@/lib/auth-client'

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
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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
          const convo = await res.json()
          if (convo.messages && convo.messages.length > 0) {
            setMessages(
              convo.messages.map((m: any) => ({
                role: m.role,
                content: m.content,
              })),
            )
          } else {
            const type = (data.user as any)?.type
            const initialMsg = type
              ? `Hello, I've been reflecting on your profile. Your use of ${type} traits seems particularly sharp today. How are you feeling about your current path?`
              : "Hello, I'm your coach. How are you feeling about your current path today?"

            setMessages([{ role: 'assistant', content: initialMsg }])
          }
        }
      } catch (error) {
        console.error('Failed to load history', error)
      }
    }

    fetchHistory()
  }, [data?.user.id])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !data?.user.id) return

    const userMessage = input.trim()
    setInput('')

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': data.user.id,
        },
        body: JSON.stringify({ content: userMessage }),
      })

      if (res.ok) {
        const aiMsg = await res.json()
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: aiMsg.content },
        ])
      }
    } catch (error) {
      console.error('Failed to send message', error)
    } finally {
      setIsTyping(false)
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
    <div className="flex h-screen flex-col bg-[#001809] font-sans">
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#c9ebd0]/5 bg-[#001809]/80 px-4 py-3 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="-ml-2 text-[#c9ebd0] hover:text-[#e9c349] transition-colors"
        >
          <Link to="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>

        <div className="flex flex-col items-center">
          <h1 className="font-serif text-xl font-normal tracking-tight text-[#e9c349]">
            SoulType
          </h1>
          <span className="text-[10px] font-medium tracking-widest text-[#c8c5d0]/60 uppercase">
            AI Growth Coach
          </span>
        </div>

        <button className="-mr-2 flex h-10 w-10 items-center justify-center text-[#c9ebd0] hover:text-[#e9c349] transition-colors">
          <MoreVertical className="h-5 w-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-end">
          <div className="mb-8 flex justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c8c5d0]/40">
              Deep Reflection Session • Today
            </span>
          </div>

          <div className="pt-4">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} role={msg.role} content={msg.content} />
            ))}

            {isTyping && (
              <div className="mb-6 flex w-full justify-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/5 bg-[#c8c5d0]/10">
                  <img
                    src="./avatar-coach.png"
                    alt="AI"
                    className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
                <div className="flex h-[52px] items-center gap-1.5 rounded-[1.5rem] rounded-bl-sm border border-white/5 bg-[#12301e] px-5 py-4 shadow-lg">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9ebd0]/50 [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9ebd0]/50 [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9ebd0]/50"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>
      </main>

      <footer className="relative z-10 shrink-0 border-t border-white/5 bg-[#001206]/90 p-4 backdrop-blur-2xl">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message your coach..."
              className="flex-1 rounded-full border border-white/10 bg-[#032110] px-6 h-12 text-[#c9ebd0] shadow-inner placeholder:text-[#c8c5d0]/40 focus-visible:ring-1 focus-visible:ring-[#e9c349]/30"
            />
            <Button
              type="submit"
              size="icon"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9c349] shadow-md transition-transform hover:bg-[#e9c349]/90 active:scale-95"
            >
              <ArrowUp className="h-6 w-6 text-[#001809]" />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  )
}
