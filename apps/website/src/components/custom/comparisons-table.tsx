import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const badgeClass = {
  green: 'border-transparent bg-green-100 text-green-800 dark:bg-lime-400 dark:text-black',
  orange: 'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-400 dark:text-black',
  red: 'border-transparent bg-red-100 text-red-800 dark:bg-red-500 dark:text-black',
}

export type CellValue = string | { text: string; badge: 'green' | 'orange' | 'red' }

export type ComparisonRow = {
  label: string
  cells: CellValue[]
}

type ComparisonsTableProps = {
  columns: string[]
  rows: ComparisonRow[]
}

function renderCell(cell: CellValue) {
  if (typeof cell === 'string') return cell
  return <Badge className={badgeClass[cell.badge]}>{cell.text}</Badge>
}

export function ComparisonsTable({ columns, rows }: ComparisonsTableProps) {
  return (
    <Table className="[&_th]:whitespace-normal [&_td]:whitespace-normal [&_th]:text-xs [&_td]:text-xs [&_th]:border-x-0 [&_th]:border-t-0 [&_td]:border-x-0 [&_td]:border-t-0 [&_td]:bg-white dark:[&_td]:bg-[#0a0a0a] [&_th]:bg-gray-50 dark:[&_th]:bg-[#161616]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Feature</TableHead>
          {columns.map(col => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.label}>
            <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
            {row.cells.map((cell, i) => (
              <TableCell key={i}>{renderCell(cell)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
