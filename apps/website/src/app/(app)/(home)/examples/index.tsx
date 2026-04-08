'use client'

import dynamic from 'next/dynamic'

import { useInView } from '@/hooks/use-in-view'
import { MacWindowGroup } from '@/components/custom/mac-window-group'

const ChatWindowDynamic = dynamic(() => import('./chat-window').then(m => m.ChatWindow), {
  ssr: false,
})
const TerminalWindowDynamic = dynamic(
  () => import('./terminal-window').then(m => m.TerminalWindow),
  { ssr: false }
)
const CodeWindowDynamic = dynamic(() => import('./code-window').then(m => m.CodeWindow), {
  ssr: false,
})

export function Examples() {
  const { ref, inView } = useInView({ rootMargin: '200px' })

  return (
    <div ref={ref} className="space-y-4">
      {inView ? (
        <MacWindowGroup>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            <ChatWindowDynamic />
            <TerminalWindowDynamic />
            <CodeWindowDynamic />
          </div>
        </MacWindowGroup>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card h-[455px] animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  )
}
