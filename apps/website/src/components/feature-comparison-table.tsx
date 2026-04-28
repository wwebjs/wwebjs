import {
  ComparisonsTable,
  type CellValue,
  type FeatureRow,
} from '@/components/custom/comparisons-table'

const rows: FeatureRow[] = [
  {
    feature: 'Runtime model',
    wwebjs: 'Browser (Puppeteer)',
    baileys: 'WebSocket',
    wppConnect: 'Browser (Puppeteer)',
    whatsappApi: 'REST API (Meta Cloud)',
  },
  {
    feature: 'Language',
    wwebjs: 'JS / Node.js',
    baileys: 'TS / Node.js',
    wppConnect: 'JS / Node.js',
    whatsappApi: 'Any',
  },
  {
    feature: 'API abstraction',
    wwebjs: 'Medium',
    baileys: 'High',
    wppConnect: 'Medium',
    whatsappApi: 'REST + Webhooks',
  },
  {
    feature: 'Ease of use',
    wwebjs: { text: 'Beginner', badge: 'green' } satisfies CellValue,
    baileys: { text: 'Medium', badge: 'orange' } satisfies CellValue,
    wppConnect: { text: 'Beginner', badge: 'green' } satisfies CellValue,
    whatsappApi: { text: 'Medium', badge: 'orange' } satisfies CellValue,
  },
  {
    feature: 'Resource usage',
    wwebjs: { text: 'High (~300-600 MB)', badge: 'red' } satisfies CellValue,
    baileys: { text: 'Low (~30-60 MB)', badge: 'green' } satisfies CellValue,
    wppConnect: { text: 'High (~300-600 MB)', badge: 'red' } satisfies CellValue,
    whatsappApi: { text: 'Minimal', badge: 'green' } satisfies CellValue,
  },
  {
    feature: 'Runtime overhead',
    wwebjs: 'Chrome + IPC',
    baileys: 'Direct WebSocket',
    wppConnect: 'Chrome + IPC',
    whatsappApi: '',
  },
  {
    feature: 'Startup time',
    wwebjs: { text: 'Slow', badge: 'orange' } satisfies CellValue,
    baileys: { text: 'Fast', badge: 'green' } satisfies CellValue,
    wppConnect: { text: 'Slow', badge: 'orange' } satisfies CellValue,
    whatsappApi: '',
  },
  {
    feature: 'Multi Device',
    wwebjs: 'Yes (QR)',
    baileys: 'Yes (QR + Code)',
    wppConnect: 'Yes (QR)',
    whatsappApi: 'Yes',
  },
  {
    feature: 'TypeScript types',
    wwebjs: 'Partial',
    baileys: 'Built-in',
    wppConnect: 'Partial',
    whatsappApi: '',
  },
  {
    feature: 'Account safety',
    wwebjs: { text: 'Medium', badge: 'orange' } satisfies CellValue,
    baileys: { text: 'Low', badge: 'red' } satisfies CellValue,
    wppConnect: { text: 'Medium', badge: 'orange' } satisfies CellValue,
    whatsappApi: 'Safe',
  },
  {
    feature: 'Stability risk',
    wwebjs: { text: 'Medium', badge: 'orange' } satisfies CellValue,
    baileys: { text: 'High', badge: 'red' } satisfies CellValue,
    wppConnect: { text: 'Medium', badge: 'orange' } satisfies CellValue,
    whatsappApi: { text: 'None', badge: 'green' } satisfies CellValue,
  },
  {
    feature: 'Pricing',
    wwebjs: { text: 'Free', badge: 'green' } satisfies CellValue,
    baileys: { text: 'Free', badge: 'green' } satisfies CellValue,
    wppConnect: { text: 'Free', badge: 'green' } satisfies CellValue,
    whatsappApi: { text: '$ Per conversation', badge: 'red' } satisfies CellValue,
  },
  {
    feature: 'Support',
    wwebjs: 'Community',
    baileys: 'Community',
    wppConnect: 'Community',
    whatsappApi: 'Official (Meta)',
  },
]

export function FeatureComparisonTable() {
  return (
    <div className="my-4">
      <ComparisonsTable rows={rows} />
    </div>
  )
}
