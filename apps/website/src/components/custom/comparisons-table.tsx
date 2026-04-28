'use client'

import { useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { DataTable, type MenuItem } from '@/components/ui/data-table'

const dotColor = {
  green: 'bg-emerald-500',
  orange: 'bg-amber-500',
  red: 'bg-red-500',
}

export type CellValue = string | { text: string; badge: 'green' | 'orange' | 'red' }

export type FeatureRow = {
  feature: string
  wwebjs: CellValue
  baileys: CellValue
  wppConnect: CellValue
  whatsappApi: CellValue
}

function cellText(value: CellValue): string {
  return typeof value === 'string' ? value : value.text
}

function toMarkdown(rows: FeatureRow[]): string {
  const headers = ['Feature', 'whatsapp-web.js', 'Baileys', 'WPPConnect', 'WhatsApp API']
  const sep = headers.map(() => '---')
  const body = rows.map(row => [
    row.feature,
    cellText(row.wwebjs),
    cellText(row.baileys),
    cellText(row.wppConnect),
    cellText(row.whatsappApi),
  ])
  return [headers, sep, ...body].map(row => `| ${row.join(' | ')} |`).join('\n')
}

function toCSV(rows: FeatureRow[]): string {
  const headers = ['Feature', 'whatsapp-web.js', 'Baileys', 'WPPConnect', 'WhatsApp API']
  const body = rows.map(row => [
    row.feature,
    cellText(row.wwebjs),
    cellText(row.baileys),
    cellText(row.wppConnect),
    cellText(row.whatsappApi),
  ])
  return [headers, ...body].map(row => row.map(v => `"${v}"`).join(',')).join('\n')
}

function renderCell(value: CellValue) {
  if (typeof value === 'string') return value || null
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium">
      <span className={`size-1.5 shrink-0 rounded-full ${dotColor[value.badge]}`} />
      {value.text}
    </span>
  )
}

const OTHER_LIBS = ['baileys', 'wppConnect', 'whatsappApi'] as const
type LibId = 'wwebjs' | (typeof OTHER_LIBS)[number]

const featureColumn: ColumnDef<FeatureRow> = {
  accessorKey: 'feature',
  header: 'Feature',
  enableHiding: false,
  cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  sortingFn: 'alphanumeric',
}

const libraryColumnMap: Record<LibId, ColumnDef<FeatureRow>> = {
  wwebjs: {
    accessorKey: 'wwebjs',
    header: 'whatsapp-web.js',
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => renderCell(getValue<CellValue>()),
  },
  baileys: {
    accessorKey: 'baileys',
    header: 'Baileys',
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => renderCell(getValue<CellValue>()),
  },
  wppConnect: {
    accessorKey: 'wppConnect',
    header: 'WPPConnect',
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => renderCell(getValue<CellValue>()),
  },
  whatsappApi: {
    accessorKey: 'whatsappApi',
    header: 'WhatsApp API',
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => renderCell(getValue<CellValue>()),
  },
}

const description =
  'You can use this list to compare features from other libraries with whatsapp-web.js. '

export function ComparisonsTable({ rows }: { rows: FeatureRow[] }) {
  const [columnPage, setColumnPage] = useState(0)

  const maxPage = OTHER_LIBS.length - 1
  const currentColumns = [
    featureColumn,
    libraryColumnMap.wwebjs,
    libraryColumnMap[OTHER_LIBS[columnPage]],
  ]

  const menuItems: MenuItem[] = [
    {
      label: 'Copy as Markdown',
      onSelect: () => navigator.clipboard.writeText(toMarkdown(rows)).catch(() => {}),
    },
    {
      label: 'Copy as CSV',
      onSelect: () => navigator.clipboard.writeText(toCSV(rows)).catch(() => {}),
      separator: true,
    },
  ]

  const footer = (
    <div className="flex items-center justify-between px-4 py-3 md:px-6">
      <Button
        variant="outline"
        size="sm"
        disabled={columnPage === 0}
        onClick={() => setColumnPage(currentPage => currentPage - 1)}
        className="gap-1.5"
      >
        <IconChevronLeft className="size-3.5" />
        Previous
      </Button>
      <span className="text-xs text-muted-foreground">
        {columnPage + 1} / {maxPage + 1}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={columnPage >= maxPage}
        onClick={() => setColumnPage(currentPage => currentPage + 1)}
        className="gap-1.5"
      >
        Next
        <IconChevronRight className="size-3.5" />
      </Button>
    </div>
  )

  return (
    <div className="[&_table]:table-fixed [&_th:first-child]:w-[35%] [&_th:nth-child(2)]:w-[32%] [&_th:nth-child(3)]:w-[33%]">
      <DataTable
        columns={currentColumns}
        data={rows}
        title="Feature Comparison"
        description={description}
        menuItems={menuItems}
        footer={footer}
      />
    </div>
  )
}
