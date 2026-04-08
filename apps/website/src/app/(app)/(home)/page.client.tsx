'use client'

import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Examples } from './examples'
import { Installation } from './installation'

const NpmDownloadsChartDynamic = dynamic(
  () => import('./statistics/npm-downloads-chart').then(m => m.NpmDownloadsChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border bg-card h-[280px] animate-pulse" />
    ),
  }
)

export function HomeTabs() {
  return (
    <Tabs defaultValue="installation" className="flex-col">
      <TabsList variant="line">
        <TabsTrigger className="text-base" value="installation">
          Installation
        </TabsTrigger>
        <TabsTrigger className="text-base" value="examples">
          Examples
        </TabsTrigger>
        <TabsTrigger className="text-base" value="statistics">
          Statistics
        </TabsTrigger>
      </TabsList>

      <TabsContent value="installation">
        <div className="space-y-8 pb-24">
          <Installation />
        </div>
      </TabsContent>

      <TabsContent value="examples">
        <div className="pb-24">
          <Examples />
        </div>
      </TabsContent>

      <TabsContent value="statistics">
        <div className="space-y-8 pb-24">
          <NpmDownloadsChartDynamic />
        </div>
      </TabsContent>
    </Tabs>
  )
}
