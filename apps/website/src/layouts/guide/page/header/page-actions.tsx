'use client'

import { useState, useCallback } from 'react'
import { Menu } from '@base-ui/react/menu'
import { IconCheckFilled, IconCopy, IconChevronDown } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import MarkdownIcon from 'public/icons/actions/markdown.svg'
import V0Icon from 'public/icons/actions/v0.svg'
import ChatGPTIcon from 'public/icons/actions/chatgpt.svg'
import ClaudeIcon from 'public/icons/actions/claude.svg'
import SciraIcon from 'public/icons/actions/scira.svg'

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this documentation: ${url}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
  )}`
}

const menuItems = [
  {
    key: 'markdown',
    label: 'View as Markdown',
    Icon: MarkdownIcon,
    href: (markdownUrl: string, _url: string) => markdownUrl,
  },
  {
    key: 'v0',
    label: 'Open in v0',
    Icon: V0Icon,
    href: (_: string, url: string) => getPromptUrl('https://v0.dev', url),
  },
  {
    key: 'chatgpt',
    label: 'Open in ChatGPT',
    Icon: ChatGPTIcon,
    href: (_: string, url: string) => getPromptUrl('https://chatgpt.com', url),
  },
  {
    key: 'claude',
    label: 'Open in Claude',
    Icon: ClaudeIcon,
    href: (_: string, url: string) => getPromptUrl('https://claude.ai/new', url),
  },
  {
    key: 'scira',
    label: 'Open in Scira',
    Icon: SciraIcon,
    href: (_: string, url: string) => getPromptUrl('https://scira.ai/', url),
  },
]

export function CopyPage({
  page,
  url,
  markdownUrl,
}: {
  page: string
  url: string
  markdownUrl: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(page)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [page])

  return (
    <div className="relative flex rounded-md bg-secondary">
      <Button
        variant="secondary"
        size="sm"
        className="rounded-l-md rounded-r-none"
        onClick={handleCopy}
      >
        {copied ? (
          <IconCheckFilled data-icon="inline-start" className="mx-1" />
        ) : (
          <IconCopy data-icon="inline-start" className="mx-1" />
        )}
        Copy Page
      </Button>

      <div className="absolute top-1 right-8 z-10 h-5 w-px bg-border/50 sm:right-7" />

      <Menu.Root>
        <Menu.Trigger
          className={cn(
            'peer -ml-0.5 flex size-8 items-center justify-center rounded-r-md bg-secondary text-secondary-foreground shadow-none transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-7'
          )}
        >
          <IconChevronDown className="size-3.5" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={6}>
            <Menu.Popup className="z-50 min-w-[11rem] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md">
              {menuItems.map(({ key, label, Icon, href }) => (
                <Menu.Item
                  key={key}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-popover-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0"
                  render={
                    <a href={href(markdownUrl, url)} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  <Icon />
                  {label}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  )
}
