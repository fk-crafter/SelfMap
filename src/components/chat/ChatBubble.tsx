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
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'bg-[#1D1B4B] text-white rounded-br-sm'
            : 'bg-white text-[#1A1A1A] rounded-bl-sm border border-primary/5',
        )}
      >
        {content}
      </div>
    </div>
  )
}
