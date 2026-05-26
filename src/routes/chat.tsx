import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowUp } from 'lucide-react'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

const MOCK_RESPONSES = [
  "C'est un excellent point de départ. D'ailleurs, pour que j'affine mon accompagnement : face à un imprévu majeur dans ce genre de projet, est-ce que tu as tendance à stresser, ou au contraire, l'adrénaline te stimule ?",
  "C'est noté, ça me permet d'ajuster mon approche. Je remarque que tu as une forte tendance à l'intuition. Quel serait le tout premier pas concret que tu pourrais faire aujourd'hui ?",
  'Parfait. Si tu le souhaites, je peux te programmer un rappel demain matin pour vérifier où tu en es. On fait ça ?',
  "Super. Au fait, pendant tes sessions de travail, tu préfères le silence absolu ou tu as besoin d'un léger fond sonore pour te concentrer ?",
  "Intéressant, ça confirme le trait 'Introverti' de notre test de départ. Je te laisse avancer sur ton objectif, n'hésite pas si tu as un blocage !",
]

function ChatPage() {
  const profile = useUserStore((state) => state.profile)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)

  const initialMessage = profile
    ? `Salut ! C'est ton coach. Ton test indique une tendance ${profile.type}, ce qui signifie que tu as des capacités uniques. Quel est ton objectif principal pour les 30 prochains jours ?`
    : "Salut ! C'est ton coach. Quel est ton objectif principal pour les 30 prochains jours ?"

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: initialMessage,
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      const nextResponse =
        MOCK_RESPONSES[stepRef.current] ||
        "Je continue d'analyser ton profil en arrière-plan. Continue comme ça !"

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: nextResponse,
        },
      ])

      if (stepRef.current < MOCK_RESPONSES.length) {
        stepRef.current += 1
      }
    }, 1500)
  }

  return (
    <div className="flex h-screen flex-col bg-[#F9F7FA]">
      <header className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.02)] z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm bg-[#b6e3f4]">
              <img
                src="./avatar-coach.png"
                alt="Avatar Coach"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-black">Ton Coach IA</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  En ligne
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto flex max-w-3xl flex-col justify-end min-h-full">
          <div className="pt-4">
            {messages.map((msg, idx) => (
              <ChatBubble
                key={idx}
                role={msg.role as 'user' | 'assistant'}
                content={msg.content}
              />
            ))}

            {isTyping && (
              <div className="flex w-full mb-4 justify-start">
                <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm border border-primary/5 flex gap-1.5 items-center h-[44px]">
                  <span className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>
      </main>

      <footer className="shrink-0 bg-white p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écris à ton coach..."
              className="flex-1 rounded-full bg-[#F9F7FA] border-none px-6 h-12 shadow-inner text-[#1A1A1A] placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full bg-[#1D1B4B] hover:bg-[#1D1B4B]/90 shadow-md transition-transform active:scale-95 flex items-center justify-center"
            >
              <ArrowUp className="h-6 w-6 text-white" />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  )
}
