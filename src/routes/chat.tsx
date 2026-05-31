import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowUp, Loader2 } from 'lucide-react'
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
              ? `Hi! I'm your coach. Your test indicates an ${type} tendency, which means you have unique capabilities. What is your main goal for the next 30 days?`
              : "Hi! I'm your coach. What is your main goal for the next 30 days?"

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
      <div className="flex h-screen items-center justify-center bg-[#F9F7FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1D1B4B]" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#F9F7FA]">
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b bg-white px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#b6e3f4] shadow-sm">
              <img
                src="./avatar-coach.png"
                alt="Coach Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-black">Your AI Coach</h2>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-end">
          <div className="pt-4">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} role={msg.role} content={msg.content} />
            ))}

            {isTyping && (
              <div className="mb-4 flex w-full justify-start">
                <div className="flex h-[44px] items-center gap-1.5 rounded-2xl rounded-bl-sm border border-primary/5 bg-white px-5 py-4 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>
      </main>

      <footer className="relative z-10 shrink-0 bg-white p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.03)]">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message your coach..."
              className="flex-1 rounded-full border-none bg-[#F9F7FA] px-6 h-12 text-[#1A1A1A] shadow-inner placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
            <Button
              type="submit"
              size="icon"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1D1B4B] shadow-md transition-transform hover:bg-[#1D1B4B]/90 active:scale-95"
            >
              <ArrowUp className="h-6 w-6 text-white" />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  )
}
