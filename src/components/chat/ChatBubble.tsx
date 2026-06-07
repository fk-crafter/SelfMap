import { cn } from '@/lib/utils'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div
      className={cn(
        'mb-6 flex w-full',
        isUser ? 'justify-end' : 'justify-start gap-3',
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/5 bg-[#c8c5d0]/10">
          <img
            src="./avatar-coach.png"
            alt="AI"
            className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
          />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[75%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed shadow-lg',
          isUser
            ? 'rounded-br-sm bg-[#2e2a5e] text-[#e3dfff]'
            : 'rounded-bl-sm border border-white/5 bg-[#12301e] font-serif text-[#c9ebd0]',
        )}
      >
        {content}
      </div>
    </div>
  )
}
