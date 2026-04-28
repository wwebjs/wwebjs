'use client'

import type { ReactNode } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type InstallTabsProps = {
  cli: ReactNode
  manual: ReactNode
}

export function InstallTabs({ cli, manual }: InstallTabsProps) {
  return (
    <Tabs defaultValue="cli">
      <TabsList variant="line">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli">{cli}</TabsContent>

      <TabsContent value="manual">{manual}</TabsContent>
    </Tabs>
  )
}
