'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'

const WWebJSSectionDynamic = dynamic(() => import('./components/demo').then(m => m.WWebJSSection), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-xl border border-border bg-card h-[455px] animate-pulse" />
      ))}
    </div>
  ),
})

const NpmDownloadsChartDynamic = dynamic(
  () => import('./components/npm-downloads-chart').then(m => m.NpmDownloadsChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border bg-card h-[280px] animate-pulse" />
    ),
  }
)

export function HomeTabs() {
  return (
    <Tabs defaultValue="wwebjs" className="flex-col">
      <TabsList variant="line">
        <TabsTrigger value="wwebjs">WWebJS</TabsTrigger>
        <TabsTrigger value="examples">Examples</TabsTrigger>
      </TabsList>

      <TabsContent value="wwebjs">
        <div className="space-y-8 pb-24">
          <WWebJSSectionDynamic />
          <NpmDownloadsChartDynamic />
        </div>
      </TabsContent>

      <TabsContent value="examples">
        <div className="pb-24">
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            Examples coming soon.
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
