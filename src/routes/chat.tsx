import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowUp } from 'lucide-react'
import { ChatBubble } from '@/components/chat/ChatBubble'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
  loader: async () => {
    return {
      user: {
        name: 'Alex',
        type: 'INTJ',
      },
    }
  },
})

const MOCK_RESPONSES = [
  "C'est un excellent objectif. Ton esprit analytique est parfait pour ça. Quelle est la toute première petite étape que tu pourrais accomplir dès aujourd'hui pour avancer dans cette direction ?",
  'Très bonne initiative ! Je te conseille de bloquer 45 minutes dans ton agenda demain matin spécifiquement pour ça. Est-ce que tu as tendance à procrastiner sur ce genre de tâche ?',
  "C'est tout à fait normal. Pour contrer ça, applique la règle des 2 minutes : si ça prend moins de 2 minutes, fais-le immédiatement sans réfléchir. Qu'est-ce qui te fait le plus peur ou te bloque dans ce projet ?",
  "Je comprends. La peur de l'imperfection paralyse souvent les esprits très stratégiques. Autorise-toi à faire un 'brouillon' imparfait. Comment te sens-tu physiquement quand tu penses à cette charge de travail ?",
  "N'oublie pas que ton corps et ton esprit sont liés. Prends 5 minutes pour respirer profondément avant de t'y mettre. Pour maximiser ton focus, préfères-tu travailler en musique ou dans le silence absolu ?",
  "C'est noté. Le silence est souvent idéal pour ta concentration profonde. N'oublie pas de faire des pauses régulières avec la méthode Pomodoro (25min de travail, 5min de pause). As-tu déjà défini tes critères de réussite précis ?",
  "Parfait. Un conseil pratique : écris ces critères sur un post-it et colle-le sur ton écran. Ça gardera ton cerveau focalisé sur la ligne d'arrivée et évitera de te disperser. Veux-tu qu'on revoie ton plan d'action ensemble ?",
  'Super. Étape 1 : Planification. Étape 2 : Exécution de la première tâche. Étape 3 : Évaluation. Pense à célébrer chaque petite victoire. Que pourrais-tu faire pour te récompenser ce soir après cette journée de travail ?',
  "C'est une excellente récompense, tu l'auras bien méritée. Repose-toi bien. N'hésite pas à m'écrire demain matin pour me faire ton rapport d'avancement. Tu as tout ce qu'il faut pour réussir.",
  "Je serai là pour t'accompagner à chaque étape. N'oublie pas : la régularité bat toujours l'intensité. À très vite !",
]

function ChatPage() {
  const { user } = Route.useLoaderData()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Salut ${user.name} ! C'est ton coach. Ton profil ${user.type} indique que tu es particulièrement doué pour la réflexion stratégique, mais que l'action immédiate peut parfois te frustrer. Pour bien démarrer notre accompagnement : quel est ton objectif principal pour les 30 prochains jours ?`,
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
        "Je n'ai plus d'autres conseils pour le moment, mais on continue demain !"

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
              className="h-12 w-12 rounded-full bg-[#1D1B4B] hover:bg-[#1D1B4B]/90 shadow-md transition-transform active:scale-95 flex items-center justify-center"
            >
              <ArrowUp className="h-6 w-6 text-white" />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  )
}
