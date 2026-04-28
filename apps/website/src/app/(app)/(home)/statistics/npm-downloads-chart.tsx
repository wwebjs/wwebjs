'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type RawEntry = { date: string; downloads: number }
type MergedEntry = { date: string; wwebjs: number; createWwebjs: number }

const chartConfig = {
  wwebjs: {
    label: 'whatsapp-web.js',
    color: 'var(--chart-1)',
  },
  createWwebjs: {
    label: 'create-wwebjs-app',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

type TimeRange = '1 Year' | '6 Months' | '3 Months'

const TIME_RANGE_OPTIONS: { label: string; value: TimeRange; months: number }[] = [
  { label: '1 Year', value: '1 Year', months: 12 },
  { label: '6 Months', value: '6 Months', months: 6 },
  { label: '3 Months', value: '3 Months', months: 3 },
]

function mergeData(raw: Record<string, RawEntry[]>): MergedEntry[] {
  const map = new Map<string, MergedEntry>()

  for (const { date, downloads } of raw['whatsapp-web.js'] ?? []) {
    map.set(date, { date, wwebjs: downloads, createWwebjs: 0 })
  }
  for (const { date, downloads } of raw['create-wwebjs-app'] ?? []) {
    const entry = map.get(date)
    if (entry) entry.createWwebjs = downloads
    else map.set(date, { date, wwebjs: 0, createWwebjs: downloads })
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date))
}

function parseDateString(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function filterData(data: MergedEntry[], months: number): MergedEntry[] {
  if (data.length === 0) return []
  const referenceDate = parseDateString(data[data.length - 1].date)
  const startDate = new Date(referenceDate)
  startDate.setMonth(startDate.getMonth() - (months - 1))
  return data.filter(item => parseDateString(item.date) >= startDate)
}

export function NpmDownloadsChart({ data: rawData }: { data: Record<string, RawEntry[]> }) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1 Year')

  const data = useMemo(() => mergeData(rawData), [rawData])
  const months = TIME_RANGE_OPTIONS.find(o => o.value === timeRange)!.months
  const { filtered, ticks } = useMemo(() => {
    const filtered = filterData(data, months)
    return { filtered, ticks: filtered.map(d => d.date) }
  }, [data, months])

  return (
    <Card className="pt-0 border-none shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>WWebJS Packages</CardTitle>
          <CardDescription>Monthly npm downloads</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={v => setTimeRange(v as TimeRange)}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="1 Year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {TIME_RANGE_OPTIONS.map(({ label, value }) => (
              <SelectItem key={value} value={value} className="rounded-lg">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filtered}>
            <defs>
              <linearGradient id="fillWwebjs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-wwebjs)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-wwebjs)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCreateWwebjs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-createWwebjs)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-createWwebjs)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              ticks={ticks}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) =>
                new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value: unknown) =>
                    new Date(value as string).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="createWwebjs"
              type="natural"
              fill="url(#fillCreateWwebjs)"
              stroke="var(--color-createWwebjs)"
              stackId="a"
            />
            <Area
              dataKey="wwebjs"
              type="natural"
              fill="url(#fillWwebjs)"
              stroke="var(--color-wwebjs)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
