'use client'

import dynamic from 'next/dynamic'

export type RawNpmData = Record<string, Array<{ date: string; downloads: number }>>

export const NpmDownloadsChart = dynamic(
  () => import('./statistics/npm-downloads-chart').then(m => m.NpmDownloadsChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border bg-card h-[280px] animate-pulse" />
    ),
  }
)
