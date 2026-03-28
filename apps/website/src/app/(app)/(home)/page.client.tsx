'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Examples } from './examples'
import dynamic from 'next/dynamic'
import { Installation } from './installation'

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
    </Tabs>
  )
}
