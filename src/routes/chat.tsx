import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Send, User, Crown, Sparkles } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'
import { ProgressJauge } from '@/components/chat/ProgressJauge'
import { SoulLoader } from '@/components/ui/soul-loader'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ExtendedUser = {
  id: string
  name: string
  type?: string | null
  avatarSeed?: string | null
  calibrationScore?: number
  plan?: string | null
}

function ChatPage() {
  const navigate = useNavigate()
  const { data, isPending } = authClient.useSession()
  const storedUser = useUserStore((state: any) => state.user)
  const hasHydrated = useUserStore((state: any) => state._hasHydrated)
  const { t, i18n } = useTranslation()

  const user = (data?.user || storedUser) as ExtendedUser | undefined
  const firstName = user?.name ? user.name.split(' ')[0] : ''
  const mbtiType = user?.type || 'MBTI'

  const getInitialWelcome = () => {
    if (user?.type && firstName) {
      return t('chat.welcomeTyped', { name: firstName, type: user.type })
    }
    return t('chat.welcome')
  }

  const avatarUrl =
    user?.avatarSeed &&
    (user.avatarSeed.startsWith('http://') ||
      user.avatarSeed.startsWith('https://') ||
      user.avatarSeed.startsWith('/'))
      ? user.avatarSeed
      : '/avatar-coach.png'

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: getInitialWelcome(),
    },
  ])
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestionPrompts = [
    t('chat.suggestion1', { type: mbtiType }),
    t('chat.suggestion2'),
    t('chat.suggestion3'),
    t('chat.suggestion4'),
  ]

  useEffect(() => {
    if (!hasLoadedHistory && user?.type && firstName) {
      setMessages([
        {
          role: 'assistant',
          content: t('chat.welcomeTyped', { name: firstName, type: user.type }),
        },
      ])
    }
  }, [user?.type, firstName, hasLoadedHistory, t])

  useEffect(() => {
    if (hasHydrated && !isPending && !data && !storedUser) {
      navigate({ to: '/login', replace: true })
    }
  }, [hasHydrated, isPending, data, storedUser, navigate])

  useEffect(() => {
    if (user?.id) {
      const savedScore = localStorage.getItem(`calibration_${user.id}`)
      if (savedScore) {
        setCurrentScore(Number(savedScore))
      } else if (user.calibrationScore) {
        setCurrentScore(user.calibrationScore)
      }
    }
  }, [user?.id, user?.calibrationScore])

  useEffect(() => {
    if (user?.id && currentScore > 0) {
      localStorage.setItem(`calibration_${user.id}`, currentScore.toString())
    }
  }, [currentScore, user?.id])

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) return

      try {
        const res = await window.fetch('/api/chat/history', {
          credentials: 'include',
          headers: {},
        })

        if (res.ok) {
          const history = await res.json()
          if (history && history.length > 0) {
            setHasLoadedHistory(true)
            setMessages(history)
          }
        }
      } catch (error) {
        toast.error(t('chat.historyError'))
      }
    }

    fetchHistory()
  }, [user?.id, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }
  }, [isLoading])

  const sendContent = async (textToSend: string) => {
    const trimmed = textToSend.trim()
    if (!trimmed || !user?.id || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)

    try {
      const res = await window.fetch('/api/chat/send', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-user-lang': i18n.language || 'en',
        },
        body: JSON.stringify({ content: trimmed }),
      })

      if (!res.ok) throw new Error('Network error')

      const result = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.reply },
      ])

      if (result.newScore !== undefined) {
        setCurrentScore(result.newScore)
      }

      if (
        result.reply &&
        (result.reply.includes('Sanctuaire') ||
          result.reply.includes('Sanctuary') ||
          result.reply.includes('méditation profonde') ||
          result.reply.includes('revenir demain') ||
          result.reply.includes('daily limit') ||
          result.reply.includes('deep meditation') ||
          result.reply.includes('come back tomorrow'))
      ) {
        toast(t('chat.dailyLimitTitle'), {
          description: t('chat.dailyLimitDesc'),
          action: {
            label: t('chat.unlock'),
            onClick: () => navigate({ to: '/subscription' }),
          },
        })
      }
    } catch (error) {
      toast.error(t('chat.sendError'))
      setMessages((prev) => prev.slice(0, -1))
      setInput(trimmed)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendContent(input)
  }

  if ((isPending && !storedUser) || (!hasHydrated && !storedUser)) {
    return <SoulLoader fullScreen />
  }

  return (
    <div className="flex h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans relative overflow-hidden">
      <div className="absolute w-125 h-125 -top-20 -left-20 rounded-full bg-[#c5c0fe] opacity-5 blur-[100px] pointer-events-none z-0" />

      <header
        style={{
          paddingTop:
            'max(1.25rem, calc(env(safe-area-inset-top, 0px) + 0.75rem))',
        }}
        className="flex-none sticky top-0 z-30 flex items-center gap-4 border-b border-white/5 bg-[#001809] px-6 pb-4"
      >
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] shadow-sm transition-colors hover:bg-white/10 hover:text-[#e9c349] active:scale-95 shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-[#c5c0fe]/20 text-[#c5c0fe]">
            <img
              src={avatarUrl}
              alt="Coach Avatar"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/avatar-coach.png'
              }}
            />
          </div>
          <h1 className="font-serif text-xl font-normal text-[#c5c0fe] tracking-tight">
            Soul Coach
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <ProgressJauge score={currentScore} />
          {user?.plan === 'PRO' ? (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#e9c349]/40 bg-[#e9c349]/10 px-2.5 py-1 text-[11px] font-bold text-[#e9c349]">
              <Crown className="h-3 w-3" /> PRO
            </span>
          ) : (
            <Link
              to="/subscription"
              className="flex items-center gap-1 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-3 py-1 text-xs font-bold text-[#e9c349] transition-all hover:bg-[#e9c349]/20 hover:scale-105 active:scale-95 shrink-0 shadow-[0_0_10px_rgba(233,195,73,0.15)]"
            >
              <Crown className="h-3.5 w-3.5" />
              <span>{t('chat.sanctuary')}</span>
            </Link>
          )}
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
                className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full overflow-hidden mt-auto ${isAi ? 'bg-[#c5c0fe]/10 text-[#c5c0fe]' : 'bg-[#e9c349]/10 text-[#e9c349]'}`}
              >
                {isAi ? (
                  <img
                    src={avatarUrl}
                    alt="Coach Avatar"
                    className="h-full w-full object-cover"
                  />
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
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full overflow-hidden mt-auto bg-[#c5c0fe]/10 text-[#c5c0fe]">
              <img
                src={avatarUrl}
                alt="Coach Avatar"
                className="h-full w-full object-cover"
              />
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

      <footer className="flex-none p-4 z-10 bg-[#001809] border-t border-white/5 pb-safe">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {showSuggestions && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="mb-3"
              >
                <div className="mb-2 flex items-center gap-1.5 px-1 text-[10px] font-bold uppercase tracking-widest text-[#e9c349]/80">
                  <Sparkles className="h-3 w-3 text-[#e9c349]" />
                  <span>{t('chat.suggestionsLabel')}</span>
                </div>
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                  {suggestionPrompts.map((promptText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendContent(promptText)}
                      className="shrink-0 whitespace-nowrap rounded-full border border-[#e9c349]/25 bg-[#e9c349]/8 px-4 py-2 text-xs font-medium text-[#c9ebd0] transition-all hover:border-[#e9c349]/60 hover:bg-[#e9c349]/15 hover:text-[#e9c349] active:scale-[0.98]"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 relative items-center"
          >
            <button
              type="button"
              onClick={() => setShowSuggestions((prev) => !prev)}
              aria-label={t('chat.suggestionsLabel')}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all active:scale-95 ${
                showSuggestions
                  ? 'border-[#e9c349]/50 bg-[#e9c349]/15 text-[#e9c349]'
                  : 'border-white/10 bg-white/5 text-[#c8c5d0]/60 hover:text-[#e9c349]'
              }`}
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
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
            </div>
          </form>
        </div>
      </footer>
    </div>
  )
}
