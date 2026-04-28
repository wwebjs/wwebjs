'use client'

import * as React from 'react'
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconSelector,
} from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface MenuItem {
  label: string
  onSelect: () => void
  separator?: boolean
}

export interface ColumnMenuItem {
  id: string
  label: string
  checked: boolean
  onToggle: () => void
}

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[]
  data: TData[]
  columnLabels?: Record<string, string>
  title?: string
  badge?: string
  description?: string
  menuItems?: MenuItem[]
  columnMenuItems?: ColumnMenuItem[]
  footer?: React.ReactNode
}

export function DataTable<TData extends object>({
  columns,
  data,
  columnLabels,
  title,
  badge,
  description,
  menuItems,
  columnMenuItems,
  footer,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const toggleableColumns = table.getAllColumns().filter(col => col.getCanHide())
  const hasColumnsButton = !columnMenuItems && toggleableColumns.length > 0
  const hasMenuButton =
    (columnMenuItems && columnMenuItems.length > 0) || (menuItems && menuItems.length > 0)
  const hasHeader = title || hasColumnsButton || hasMenuButton

  return (
    <div className="rounded-xl border overflow-hidden">
      {hasHeader && (
        <div className="border-b px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            {title && (
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold">{title}</span>
                {badge && (
                  <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {badge}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              {hasColumnsButton && (
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button variant="outline" size="sm" className="gap-1.5">
                        Columns
                        <IconChevronDown className="size-3.5" />
                      </Button>
                    }
                  />
                  <PopoverContent align="end" className="min-w-[160px] p-1">
                    {toggleableColumns.map(col => (
                      <button
                        key={col.id}
                        onClick={() => col.toggleVisibility()}
                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm hover:bg-muted"
                      >
                        {columnLabels?.[col.id] ?? col.id}
                        {col.getIsVisible() && (
                          <IconCheck className="size-3.5 text-muted-foreground" />
                        )}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              )}
              {hasMenuButton && (
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button variant="ghost" size="sm" className="size-8 p-0">
                        <IconDotsVertical className="size-4" />
                      </Button>
                    }
                  />
                  <PopoverContent align="end" className="min-w-[180px] p-1">
                    {columnMenuItems?.map(item => (
                      <button
                        key={item.id}
                        onClick={item.onToggle}
                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm hover:bg-muted"
                      >
                        {item.label}
                        {item.checked && <IconCheck className="size-3.5 text-muted-foreground" />}
                      </button>
                    ))}
                    {columnMenuItems &&
                      columnMenuItems.length > 0 &&
                      menuItems &&
                      menuItems.length > 0 && <div className="mx-1 my-1 h-px bg-border" />}
                    {menuItems?.map((item, i) => (
                      <React.Fragment key={i}>
                        {item.separator && <div className="mx-1 my-1 h-px bg-border" />}
                        <button
                          onClick={item.onSelect}
                          className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-muted"
                        >
                          {item.label}
                        </button>
                      </React.Fragment>
                    ))}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="no-scrollbar w-full overflow-auto">
        <Table className="[&_th]:whitespace-normal [&_td]:whitespace-normal [&_th]:text-xs [&_td]:text-xs [&_th]:border-x-0 [&_th]:border-t-0 [&_td]:border-x-0 [&_td]:border-t-0 [&_th]:bg-muted/50 [&_th]:text-muted-foreground [&_th]:font-medium [&_th:first-child]:pl-4 md:[&_th:first-child]:pl-6 [&_td:first-child]:pl-4 md:[&_td:first-child]:pl-6 [&_th:last-child]:pr-4 md:[&_th:last-child]:pr-6 [&_td:last-child]:pr-4 md:[&_td:last-child]:pr-6">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(canSort && 'cursor-pointer select-none')}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort &&
                          (sorted === 'asc' ? (
                            <IconChevronUp className="size-3" />
                          ) : sorted === 'desc' ? (
                            <IconChevronDown className="size-3" />
                          ) : (
                            <IconSelector className="size-3 opacity-40" />
                          ))}
                      </span>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {footer && <div className="border-t">{footer}</div>}
    </div>
  )
}
