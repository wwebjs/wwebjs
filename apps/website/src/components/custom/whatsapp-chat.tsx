import { IconMicrophone } from '@tabler/icons-react'

import { cn } from '@/lib/utils'

type ChatMessage = {
  id: string
  content: string
  direction: 'inbound' | 'outbound'
  time: string
}

type WhatsAppChatProps = {
  contactName?: string
  messages?: ChatMessage[]
  className?: string
}

const defaultMessages: ChatMessage[] = [
  { id: '1', content: '!ping', direction: 'inbound', time: '14:23' },
  { id: '2', content: 'pong', direction: 'outbound', time: '14:23' },
]

export function WhatsAppChat({
  contactName = 'MyBot',
  messages = defaultMessages,
  className,
}: WhatsAppChatProps) {
  return (
    <div
      className={cn(
        'flex w-72 flex-col overflow-hidden rounded-2xl border border-black/10 shadow-xl dark:border-white/10',
        className
      )}
    >
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          {contactName[0].toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{contactName}</p>
          <p className="text-xs text-white/70">online</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 bg-[#EAE6DF] px-3 py-4 dark:bg-[#0B141A]">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.direction === 'outbound' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[78%] rounded-lg px-3 py-1.5 shadow-sm',
                message.direction === 'outbound'
                  ? 'rounded-tr-[3px] bg-[#D9FDD3] text-black dark:bg-[#005C4B] dark:text-white'
                  : 'rounded-tl-[3px] bg-white text-black dark:bg-[#202C33] dark:text-white'
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={cn(
                  'mt-0.5 text-right text-[10px] leading-none',
                  message.direction === 'outbound'
                    ? 'text-black/50 dark:text-white/50'
                    : 'text-black/40 dark:text-white/40'
                )}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-[#F0F2F5] px-3 py-2 dark:bg-[#202C33]">
        <div className="flex flex-1 items-center rounded-full bg-white px-4 py-1.5 text-sm text-black/30 dark:bg-[#2A3942] dark:text-white/30">
          Message
        </div>
        <button
          type="button"
          aria-label="Send voice message"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00A884] text-white"
        >
          <IconMicrophone className="size-4" />
        </button>
      </div>
    </div>
  )
}
