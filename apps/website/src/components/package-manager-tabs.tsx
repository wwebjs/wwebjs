'use client'

import * as React from 'react'
import { IconTerminal } from '@tabler/icons-react'

import { usePackageManager } from '@/hooks/use-package-manager'
import { copyToClipboard } from '@/lib/copy-to-clipboard'
import { CodeBlockHeader } from '@/components/block-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  npm?: string
  yarn?: string
  pnpm?: string
}

export function PackageManagerTabs({ npm, yarn, pnpm }: Props) {
  const [packageManager, setPackageManager] = usePackageManager()

  const tabs = React.useMemo(() => ({ pnpm, npm, yarn }), [pnpm, npm, yarn])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]
    if (!command) return
    copyToClipboard(command)
  }, [packageManager, tabs])

  return (
    <div
      data-slot="tabs"
      className="relative mt-6 overflow-hidden rounded-xl bg-code text-code-foreground"
    >
      <div className="overflow-x-auto">
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={value => {
            setPackageManager(value as typeof packageManager)
          }}
        >
          <CodeBlockHeader
            icon={<IconTerminal className="size-3 text-code stroke-[2.5]" />}
            onCopy={copyCommand}
          >
            <TabsList className="rounded-none bg-transparent p-0">
              {Object.entries(tabs).map(([key]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="h-7 border-0 pt-0.5 shadow-none! data-active:bg-background!"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </CodeBlockHeader>
          <div className="no-scrollbar overflow-x-auto">
            {Object.entries(tabs).map(([key, value]) => (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre>
                  <code className="relative font-mono text-sm leading-none" data-language="bash">
                    {value}
                  </code>
                </pre>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
