import { ComparisonsTable, type ComparisonRow } from '@/components/custom/comparisons-table'

const columns = ['whatsapp-web.js', 'Baileys (WhiskeySockets)', 'WhatsApp API']

const rows: ComparisonRow[] = [
  {
    label: 'Runtime model',
    cells: ['Browser (Puppeteer)', 'WebSocket', 'REST API (Meta Cloud)'],
  },
  { label: 'Language', cells: ['JS / Node.js', 'TS / Node.js', 'Any'] },
  { label: 'API abstraction', cells: ['Medium', 'High', 'REST + Webhooks'] },
  {
    label: 'Ease of use',
    cells: [
      { text: 'Beginner', badge: 'green' },
      { text: 'Medium', badge: 'orange' },
      { text: 'Medium', badge: 'orange' },
    ],
  },
  {
    label: 'Resource usage',
    cells: [
      { text: 'High (~300–600 MB)', badge: 'red' },
      { text: 'Low (~30–60 MB)', badge: 'green' },
      { text: 'Minimal', badge: 'green' },
    ],
  },
  {
    label: 'Runtime overhead',
    cells: ['Chrome + IPC', 'Direct WebSocket', ''],
  },
  {
    label: 'Startup time',
    cells: [{ text: 'Slow', badge: 'orange' }, { text: 'Fast', badge: 'green' }, ''],
  },
  { label: 'Multi Device', cells: ['Yes (QR)', 'Yes (QR + Code)', 'Yes'] },
  { label: 'TypeScript types', cells: ['Partial', 'Built-in', ''] },
  {
    label: 'Account safety',
    cells: [{ text: 'Medium', badge: 'orange' }, { text: 'Low', badge: 'red' }, 'Safe'],
  },
  {
    label: 'Stability risk',
    cells: [
      { text: 'Medium', badge: 'orange' },
      { text: 'High', badge: 'red' },
      { text: 'None', badge: 'green' },
    ],
  },
  {
    label: 'Pricing',
    cells: [
      { text: 'Free', badge: 'green' },
      { text: 'Free', badge: 'green' },
      { text: '$ Per conversation', badge: 'red' },
    ],
  },
  { label: 'Support', cells: ['Community', 'Community', 'Official (Meta)'] },
]

export function FeatureComparisonTable() {
  return <ComparisonsTable columns={columns} rows={rows} />
}
